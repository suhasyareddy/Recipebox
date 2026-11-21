import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
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

    const cleanUserId = userId.replace(/[^a-zA-Z0-9_-]/g, "_");
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg";
    const fileName = `avatars/${cleanUserId}_${Date.now()}.${safeExt}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Primary: Upload directly to Supabase Storage
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    const authHeader = request.headers.get("authorization");

    let publicUrl: string | null = null;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          global: {
            headers: authHeader ? { Authorization: authHeader } : undefined,
          },
        });

        const { error: sbError } = await supabase.storage
          .from("recipe-images")
          .upload(fileName, buffer, {
            contentType: file.type || `image/${safeExt}`,
            upsert: true,
          });

        if (!sbError) {
          const { data: pubData } = supabase.storage
            .from("recipe-images")
            .getPublicUrl(fileName);

          if (pubData?.publicUrl) {
            // Append cache-busting timestamp so browser/Next.js never serves a stale image
            publicUrl = `${pubData.publicUrl}?v=${Date.now()}`;

            // Also immediately sync to profiles table in Supabase
            if (userId && userId !== "user" && !userId.startsWith("demo-")) {
              await supabase
                .from("profiles")
                .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
                .eq("id", userId);
            }
          }
        } else {
          console.warn("API route Supabase storage upload returned notice:", sbError.message);
        }
      } catch (sbErr) {
        console.warn("API route Supabase client exception:", sbErr);
      }
    }

    // 2. Local disk fallback (dev-only; safely ignored in serverless/production to avoid EROFS)
    if (!publicUrl) {
      if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
        try {
          const uploadsDir = path.join(process.cwd(), "public", "uploads", "avatars");
          await fs.promises.mkdir(uploadsDir, { recursive: true });
          const localFileName = `${cleanUserId}_${Date.now()}.${safeExt}`;
          await fs.promises.writeFile(path.join(uploadsDir, localFileName), buffer);
          publicUrl = `/uploads/avatars/${localFileName}`;
        } catch (localErr) {
          console.warn("Local disk write ignored:", localErr);
        }
      }
    }

    if (!publicUrl) {
      return NextResponse.json(
        {
          error:
            "Could not upload image to Supabase Storage. Please ensure the 'recipe-images' bucket is configured in your Supabase Dashboard.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: publicUrl, success: true });
  } catch (err: any) {
    console.error("Avatar upload API error:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
