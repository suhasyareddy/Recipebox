import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const userId = (formData.get("userId") as string) || "user";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "avatars");
    await fs.promises.mkdir(uploadsDir, { recursive: true });

    // Sanitize extension and file name
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
    const fileName = `${userId.replace(/[^a-zA-Z0-9_-]/g, "_")}_${Date.now()}.${safeExt}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.promises.writeFile(filePath, buffer);

    const publicUrl = `/uploads/avatars/${fileName}`;

    // Also update public/uploads/profiles.json so GET /api/profile immediately returns the new avatar
    try {
      const profilesFile = path.join(process.cwd(), "public", "uploads", "profiles.json");
      let profiles: any = {};
      if (fs.existsSync(profilesFile)) {
        profiles = JSON.parse(await fs.promises.readFile(profilesFile, "utf-8"));
      }
      profiles[userId] = {
        ...(profiles[userId] || {}),
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      };
      await fs.promises.writeFile(profilesFile, JSON.stringify(profiles, null, 2), "utf-8");
    } catch (profErr) {
      console.warn("Notice updating profiles.json:", profErr);
    }

    return NextResponse.json({ url: publicUrl });
  } catch (err: any) {
    console.error("Avatar upload API error:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
