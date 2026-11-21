"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isConfigured: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    dietary?: string
  ) => Promise<{ error: string | null; needsEmailConfirmation?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: string | null }>;
  loginAsDemoUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default guest profile when running without Supabase credentials
const DEMO_USER_ID = "demo-amma-lakshmi-id";
const DEMO_USER = {
  id: DEMO_USER_ID,
  app_metadata: {},
  user_metadata: { full_name: "Amma Lakshmi" },
  aud: "authenticated",
  created_at: new Date().toISOString(),
  email: "amma.lakshmi@recipebox.internal",
} as unknown as User;

const DEMO_PROFILE: Profile = {
  id: DEMO_USER_ID,
  email: "amma.lakshmi@recipebox.internal",
  full_name: "Amma Lakshmi",
  avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  bio: "Master home chef preserving four generations of South Indian & North Indian satvik culinary secrets.",
  dietary_preference: "Vegetarian",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);

  // Fetch or create profile for authenticated Supabase user
  const fetchProfile = useCallback(async (supabaseUser: User) => {
    // 1. Check local storage cache for instant reactive state
    let cached: Partial<Profile> = {};
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`recipebox_user_profile_${supabaseUser.id}`);
        if (stored) cached = JSON.parse(stored);
      } catch {}
    }

    const meta = supabaseUser.user_metadata || {};
    const fallbackProfile: Profile = {
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      full_name: cached.full_name || meta.full_name || supabaseUser.email?.split("@")[0] || "Home Chef",
      avatar_url:
        cached.avatar_url ||
        meta.avatar_url ||
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: cached.bio || meta.bio || "Passionate home chef creating wholesome family meals.",
      dietary_preference: cached.dietary_preference || meta.dietary_preference || "Vegetarian",
      created_at: supabaseUser.created_at,
      updated_at: new Date().toISOString(),
    };

    const supabase = getSupabaseClient();
    if (!supabase) {
      setProfile(fallbackProfile);
      return;
    }

    try {
      // Use maybeSingle to prevent PGRST116 throwing error when 0 rows match
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .maybeSingle();

      if (!error && data) {
        const merged: Profile = {
          ...fallbackProfile,
          ...data,
          full_name: data.full_name || fallbackProfile.full_name,
          bio: data.bio || fallbackProfile.bio,
          dietary_preference: data.dietary_preference || fallbackProfile.dietary_preference,
          avatar_url: data.avatar_url || fallbackProfile.avatar_url,
          email: supabaseUser.email || data.email || fallbackProfile.email,
        };
        setProfile(merged);
        if (typeof window !== "undefined") {
          localStorage.setItem(`recipebox_user_profile_${supabaseUser.id}`, JSON.stringify(merged));
        }
      } else {
        // If row does not exist yet, auto-create it in profiles table
        try {
          await supabase.from("profiles").upsert(
            {
              id: supabaseUser.id,
              full_name: fallbackProfile.full_name,
              bio: fallbackProfile.bio,
              dietary_preference: fallbackProfile.dietary_preference,
              avatar_url: fallbackProfile.avatar_url,
              email: fallbackProfile.email,
            },
            { onConflict: "id" }
          );
        } catch (insertErr) {
          console.warn("Profile table initial sync notice:", insertErr);
        }
        setProfile(fallbackProfile);
      }
    } catch (err) {
      console.warn("Using fallback profile:", err);
      setProfile(fallbackProfile);
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    // Proactively clean oversized/base64 cookies and localStorage on client
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      try {
        const rawCookies = document.cookie ? document.cookie.split(";") : [];
        for (const cookieStr of rawCookies) {
          const parts = cookieStr.trim().split("=");
          const name = parts[0];
          const val = parts.slice(1).join("=");
          if (val.includes("data%3Aimage") || val.includes("data:image") || (name.startsWith("sb-") && val.length > 2500)) {
            document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;`;
          }
        }

        // Clean local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith("sb-") || key.startsWith("recipebox_"))) {
            const val = localStorage.getItem(key) || "";
            if (val.includes("data:image/") || val.includes("data%3Aimage") || val.length > 50000) {
              localStorage.removeItem(key);
            }
          }
        }
      } catch (cleanErr) {
        console.warn("Storage cleaner notice:", cleanErr);
      }
    }

    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    if (!configured) {
      const storedDemo =
        typeof window !== "undefined"
          ? localStorage.getItem("recipebox_demo_user")
          : null;
      if (storedDemo) {
        try {
          const parsed = JSON.parse(storedDemo);
          setUser(parsed.user);
          setProfile(parsed.profile);
        } catch {
          setUser(DEMO_USER);
          setProfile(DEMO_PROFILE);
        }
      } else {
        setUser(DEMO_USER);
        setProfile(DEMO_PROFILE);
      }
      setIsLoading(false);
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    // Get current session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Auto-purge any oversized base64 avatar from user metadata to shrink JWT cookie
        if (session.user.user_metadata?.avatar_url?.startsWith("data:")) {
          supabase.auth.updateUser({ data: { avatar_url: null } }).catch(() => {});
        }
        setUser(session.user);
        fetchProfile(session.user);
      } else {
        const storedDemo =
          typeof window !== "undefined"
            ? localStorage.getItem("recipebox_demo_user")
            : null;
        if (storedDemo) {
          try {
            const parsed = JSON.parse(storedDemo);
            setUser(parsed.user);
            setProfile(parsed.profile);
          } catch {
            setUser(null);
            setProfile(null);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
      }
      setIsLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user);
      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    dietary: string = "Vegetarian"
  ) => {
    if (!isConfigured) {
      const mockId = "user-" + Math.random().toString(36).substring(2, 9);
      const mockUser = {
        id: mockId,
        email,
        user_metadata: { full_name: fullName, dietary_preference: dietary },
      } as unknown as User;
      const mockProfile: Profile = {
        id: mockId,
        email,
        full_name: fullName,
        avatar_url:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        bio: "Passionate home chef creating wholesome family meals.",
        dietary_preference: dietary,
      };
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem(
        "recipebox_demo_user",
        JSON.stringify({ user: mockUser, profile: mockProfile })
      );
      return { error: null, needsEmailConfirmation: false };
    }

    const supabase = getSupabaseClient();
    if (!supabase) return { error: "Supabase client not initialized." };

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          dietary_preference: dietary,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      try {
        await supabase.from("profiles").upsert(
          {
            id: data.user.id,
            full_name: fullName,
            dietary_preference: dietary,
            email: email,
            avatar_url:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
          },
          { onConflict: "id" }
        );
      } catch {
        // Table sync deferred
      }

      if (data.session) {
        setUser(data.user);
        await fetchProfile(data.user);
        return { error: null, needsEmailConfirmation: false };
      } else {
        return { error: null, needsEmailConfirmation: true };
      }
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    if (!isConfigured) {
      const mockUser = {
        id: DEMO_USER_ID,
        email,
        user_metadata: { full_name: "Amma Lakshmi" },
      } as unknown as User;
      setUser(mockUser);
      setProfile(DEMO_PROFILE);
      localStorage.setItem(
        "recipebox_demo_user",
        JSON.stringify({ user: mockUser, profile: DEMO_PROFILE })
      );
      return { error: null };
    }

    const supabase = getSupabaseClient();
    if (!supabase) return { error: "Supabase client not initialized." };

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      setUser(data.user);
      await fetchProfile(data.user);
    }

    return { error: null };
  };

  const signOut = async () => {
    if (!isConfigured) {
      setUser(null);
      setProfile(null);
      localStorage.removeItem("recipebox_demo_user");
      return;
    }

    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("recipebox_demo_user");
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    const activeUserId = user?.id || profile?.id;
    if (!activeUserId) return { error: "No profile loaded." };

    const updatedProfile: Profile = {
      ...(profile || ({} as Profile)),
      ...updates,
      id: activeUserId,
      email: user?.email || profile?.email || "",
      updated_at: new Date().toISOString(),
    };

    // 1. Optimistically update local React state immediately so UI updates in real-time
    setProfile(updatedProfile);

    // 2. Persist in local storage immediately
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `recipebox_user_profile_${activeUserId}`,
        JSON.stringify(updatedProfile)
      );
    }

    if (!isConfigured || !user || user.id.startsWith("demo-")) {
      return { error: null };
    }

    const supabase = getSupabaseClient();
    if (!supabase) return { error: "Supabase client not initialized." };

    // 3. Update Supabase Auth User Metadata (only pass safe HTTP URL to prevent cookie overflow / HTTP 431)
    try {
      const cleanMeta: any = {
        full_name: updatedProfile.full_name,
        bio: updatedProfile.bio,
        dietary_preference: updatedProfile.dietary_preference,
      };

      if (
        updatedProfile.avatar_url &&
        !updatedProfile.avatar_url.startsWith("data:") &&
        (updatedProfile.avatar_url.startsWith("http://") ||
          updatedProfile.avatar_url.startsWith("https://") ||
          updatedProfile.avatar_url.startsWith("/"))
      ) {
        cleanMeta.avatar_url = updatedProfile.avatar_url;
      } else {
        cleanMeta.avatar_url = null;
      }

      await supabase.auth.updateUser({
        data: cleanMeta,
      });
    } catch (authMetaErr) {
      console.warn("Auth user metadata update notice:", authMetaErr);
    }

    // 4. Update 'profiles' table in Supabase PostgreSQL
    try {
      const payload: any = {
        id: user.id,
        full_name: updatedProfile.full_name,
        bio: updatedProfile.bio,
        dietary_preference: updatedProfile.dietary_preference,
        avatar_url: updatedProfile.avatar_url,
        email: user.email,
        updated_at: new Date().toISOString(),
      };

      // Try update first
      const { error: updateError, count } = await supabase
        .from("profiles")
        .update(payload)
        .eq("id", user.id);

      if (updateError || count === 0) {
        // Try upsert if row was not present
        const { error: dbError } = await supabase
          .from("profiles")
          .upsert(payload, { onConflict: "id" });

        if (dbError) {
          console.warn(
            "Profiles table update notice (saved to Supabase Auth metadata & client cache):",
            dbError.message
          );
        }
      }
    } catch (err: any) {
      console.warn("Handled profile table update:", err);
    }

    return { error: null };
  };

  const loginAsDemoUser = () => {
    setUser(DEMO_USER);
    setProfile(DEMO_PROFILE);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "recipebox_demo_user",
        JSON.stringify({ user: DEMO_USER, profile: DEMO_PROFILE })
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isConfigured,
        signUp,
        signIn,
        signOut,
        updateProfile,
        loginAsDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
