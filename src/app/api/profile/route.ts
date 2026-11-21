import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const PROFILES_FILE = path.join(process.cwd(), "public", "uploads", "profiles.json");

async function readProfiles(): Promise<Record<string, any>> {
  try {
    if (fs.existsSync(PROFILES_FILE)) {
      const content = await fs.promises.readFile(PROFILES_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading profiles.json:", err);
  }
  return {};
}

async function writeProfiles(data: Record<string, any>) {
  try {
    const dir = path.dirname(PROFILES_FILE);
    await fs.promises.mkdir(dir, { recursive: true });
    await fs.promises.writeFile(PROFILES_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing profiles.json:", err);
  }
}

// GET: fetch saved profile by userId
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const profiles = await readProfiles();
  const profile = profiles[userId] || {};

  // If avatar_url is not set in profiles.json, check if an avatar file exists in public/uploads/avatars/
  if (!profile.avatar_url) {
    try {
      const avatarsDir = path.join(process.cwd(), "public", "uploads", "avatars");
      if (fs.existsSync(avatarsDir)) {
        const files = await fs.promises.readdir(avatarsDir);
        // Find most recent file starting with userId
        const userFiles = files
          .filter((f) => f.startsWith(userId))
          .sort((a, b) => b.localeCompare(a));

        if (userFiles.length > 0) {
          profile.avatar_url = `/uploads/avatars/${userFiles[0]}`;
          profiles[userId] = profile;
          await writeProfiles(profiles);
        }
      }
    } catch (err) {
      console.warn("Avatar directory scan notice:", err);
    }
  }

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

    const profiles = await readProfiles();
    profiles[userId] = {
      ...(profiles[userId] || {}),
      ...body,
      updated_at: new Date().toISOString(),
    };

    await writeProfiles(profiles);

    return NextResponse.json({ success: true, profile: profiles[userId] });
  } catch (err: any) {
    console.error("Profile save error:", err);
    return NextResponse.json({ error: err.message || "Failed to save profile" }, { status: 500 });
  }
}
