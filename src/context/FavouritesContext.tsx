"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { Recipe } from "@/lib/supabase/types";

interface FavouritesContextType {
  favouriteIds: string[];
  isFavourite: (recipeId: string) => boolean;
  toggleFavourite: (recipe: Recipe) => Promise<boolean>;
  isLoading: boolean;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favourites whenever user changes
  useEffect(() => {
    async function loadFavourites() {
      setIsLoading(true);

      if (isSupabaseConfigured() && user) {
        const supabase = getSupabaseClient();
        if (supabase) {
          try {
            const { data, error } = await supabase
              .from("favourites")
              .select("recipe_id")
              .eq("user_id", user.id);

            if (!error && data) {
              setFavouriteIds(data.map((item) => item.recipe_id));
              setIsLoading(false);
              return;
            }
          } catch (err) {
            console.error("Error loading Supabase favourites:", err);
          }
        }
      }

      // Local storage fallback for guest / demo / offline
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("recipebox_favourites");
          if (stored) {
            setFavouriteIds(JSON.parse(stored));
          } else {
            // Default seed favourites: Masala Dosa & Palak Paneer
            setFavouriteIds(["masala-dosa", "palak-paneer"]);
          }
        } catch {
          setFavouriteIds(["masala-dosa", "palak-paneer"]);
        }
      }
      setIsLoading(false);
    }

    loadFavourites();
  }, [user]);

  const isFavourite = useCallback(
    (recipeId: string) => {
      return favouriteIds.includes(recipeId);
    },
    [favouriteIds]
  );

  const toggleFavourite = useCallback(
    async (recipe: Recipe): Promise<boolean> => {
      const isFav = favouriteIds.includes(recipe.id);
      const nextFavs = isFav
        ? favouriteIds.filter((id) => id !== recipe.id)
        : [...favouriteIds, recipe.id];

      // Optimistic state update
      setFavouriteIds(nextFavs);

      if (typeof window !== "undefined") {
        localStorage.setItem("recipebox_favourites", JSON.stringify(nextFavs));
      }

      // Sync with Supabase if configured and user is signed in
      if (isSupabaseConfigured() && user) {
        const supabase = getSupabaseClient();
        if (supabase) {
          try {
            if (isFav) {
              await supabase
                .from("favourites")
                .delete()
                .eq("user_id", user.id)
                .eq("recipe_id", recipe.id);
            } else {
              await supabase.from("favourites").insert({
                user_id: user.id,
                recipe_id: recipe.id,
              });
            }
          } catch (err) {
            console.error("Failed to sync favourite with Supabase:", err);
          }
        }
      }

      if (isFav) {
        showToast("info", "Removed from Favourites", `${recipe.title} removed from your saved recipes.`);
      } else {
        showToast("success", "Saved to Favourites", `${recipe.title} added to your personal collection.`);
      }

      return !isFav;
    },
    [favouriteIds, user, showToast]
  );

  return (
    <FavouritesContext.Provider
      value={{
        favouriteIds,
        isFavourite,
        toggleFavourite,
        isLoading,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
}
