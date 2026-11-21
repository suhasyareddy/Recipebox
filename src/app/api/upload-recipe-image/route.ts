import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    const authHeader = request.headers.get("authorization");

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
    const fileName = `recipes/recipe_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${safeExt}`;

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
            return NextResponse.json({ url: `${pubData.publicUrl}?v=${Date.now()}` });
          }
        } else {
          console.warn("Supabase storage recipe upload notice:", sbError.message);
        }
      } catch (sbErr) {
        console.warn("API route Supabase recipe image upload exception:", sbErr);
      }
    }

    return NextResponse.json(
      { error: "Could not upload image to Supabase Storage." },
      { status: 500 }
    );
  } catch (err: any) {
    console.error("Recipe image upload API error:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
