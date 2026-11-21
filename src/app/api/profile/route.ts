import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const PROFILES_FILE = path.join(process.cwd(), "public", "uploads", "profiles.json");

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) return null;
  return createClient(url, key);
}

async function readProfilesLocal(): Promise<Record<string, any>> {
  try {
    if (fs.existsSync(PROFILES_FILE)) {
      const content = await fs.promises.readFile(PROFILES_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch {}
  return {};
}

async function writeProfilesLocal(data: Record<string, any>) {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    return; // Do not attempt disk writes on read-only serverless filesystems
  }
  try {
    const dir = path.dirname(PROFILES_FILE);
    await fs.promises.mkdir(dir, { recursive: true });
    await fs.promises.writeFile(PROFILES_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {}
}

// GET: fetch saved profile by userId
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  // 1. Primary: Fetch from Supabase
  const supabase = getSupabase();
  if (supabase && userId !== "user" && !userId.startsWith("demo-")) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (!error && data) {
        return NextResponse.json(data);
      }
    } catch (err) {
      console.warn("Supabase profile fetch in API notice:", err);
    }
  }

  // 2. Local fallback
  const profiles = await readProfilesLocal();
  const profile = profiles[userId] || {};

  return NextResponse.json(profile);
}

// POST: save profile updates
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.id || body.userId;

    if (!userId) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    // 1. Primary: Update Supabase profiles table
    const supabase = getSupabase();
    if (supabase && userId !== "user" && !userId.startsWith("demo-")) {
      try {
        const payload: any = {
          id: userId,
          full_name: body.full_name,
          bio: body.bio,
          dietary_preference: body.dietary_preference || body.food_preference,
          food_preference: body.food_preference || body.dietary_preference,
          avatar_url: body.avatar_url,
          email: body.email,
          updated_at: new Date().toISOString(),
        };

        const { error } = await supabase
          .from("profiles")
          .upsert(payload, { onConflict: "id" });

        if (error) {
          console.warn("Supabase profile upsert in API notice:", error.message);
        }
      } catch (sbErr) {
        console.warn("Supabase profile API exception:", sbErr);
      }
    }

    // 2. Safe local write (dev only)
    const profiles = await readProfilesLocal();
    profiles[userId] = {
      ...(profiles[userId] || {}),
      ...body,
      updated_at: new Date().toISOString(),
    };
    await writeProfilesLocal(profiles);

    return NextResponse.json({ success: true, profile: profiles[userId] });
  } catch (err: any) {
    console.error("Profile save API error:", err);
    return NextResponse.json({ error: err.message || "Failed to save profile" }, { status: 500 });
  }
}
