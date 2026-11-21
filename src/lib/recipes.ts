import { getSupabaseClient, isSupabaseConfigured } from "./supabase/client";
import type { Recipe, RecipeIngredient } from "./supabase/types";
import { SAMPLE_RECIPES } from "@/data/recipes";

// Convert sample recipe from static dataset to unified Recipe interface
export function sampleToRecipe(s: (typeof SAMPLE_RECIPES)[0]): Recipe {
  return {
    id: s.id,
    user_id: "demo-amma-lakshmi-id",
    title: s.title,
    description: s.description || s.subtitle,
    category: s.mealType === "Snack" ? "Snacks" : (s.mealType as Recipe["category"]),
    prep_time: parseInt(s.prepTime) || 15,
    cook_time: parseInt(s.cookTime) || 25,
    servings: s.servings,
    calories: s.calories,
    ingredients: s.ingredients.map((i) => ({
      item: i.name,
      quantity: `${i.amount} ${i.unit}`,
      notes: i.notes,
    })),
    instructions: s.steps.map((step) => `${step.title}: ${step.instructions}`),
    image_url: s.image,
    spice_level: s.spiceLevel === "Mild/Med" ? "Medium" : (s.spiceLevel as Recipe["spice_level"]),
    dietary_tags: s.dietaryTags,
    author_name: "Amma Lakshmi",
    author_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    created_at: new Date(2026, 0, 1).toISOString(),
    updated_at: new Date(2026, 0, 1).toISOString(),
  };
}

const SEED_RECIPES: Recipe[] = SAMPLE_RECIPES.map(sampleToRecipe);

// Get custom local recipes stored in browser memory/localStorage
function getLocalCustomRecipes(): Recipe[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("recipebox_custom_recipes");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCustomRecipes(recipes: Recipe[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("recipebox_custom_recipes", JSON.stringify(recipes));
}

// Upload avatar image (tries local API first, then Supabase Storage fallback)
// Upload avatar image to Supabase Storage (direct browser upload with API server route fallback)
export async function uploadAvatarImage(file: File, userId?: string): Promise<string> {
  const cleanUserId = userId ? userId.replace(/[^a-zA-Z0-9_-]/g, "_") : "user";
  const fileExt = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const safeExt = ["jpg", "jpeg", "png", "webp"].includes(fileExt) ? fileExt : "jpg";
  const fileName = `avatars/${cleanUserId}_${Date.now()}.${safeExt}`;

  // 1. Primary: Upload directly to Supabase Storage if configured
  const supabase = getSupabaseClient();
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error: sbError } = await supabase.storage
        .from("recipe-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type || `image/${safeExt}`,
        });

      if (!sbError) {
        const { data: pubData } = supabase.storage
          .from("recipe-images")
          .getPublicUrl(fileName);

        if (pubData?.publicUrl) {
          // Append cache-busting timestamp so browser/Next.js never caches stale image
          return `${pubData.publicUrl}?v=${Date.now()}`;
        }
      } else {
        console.warn("Direct Supabase storage upload notice, delegating to API:", sbError.message);
      }
    } catch (sbErr) {
      console.warn("Direct Supabase storage exception:", sbErr);
    }
  }

  // 2. Secondary fallback: Server-side API endpoint (which also uploads to Supabase Storage)
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (userId) formData.append("userId", userId);

    const headers: Record<string, string> = {};
    if (supabase) {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.access_token) {
        headers["Authorization"] = `Bearer ${sessionData.session.access_token}`;
      }
    }

    const res = await fetch("/api/upload-avatar", {
      method: "POST",
      headers,
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.url) return data.url;
    } else {
      const errData = await res.json().catch(() => null);
      if (errData?.error) throw new Error(errData.error);
    }
  } catch (apiErr: any) {
    console.warn("API route avatar upload notice:", apiErr);
    if (apiErr?.message && !apiErr.message.includes("fetch")) {
      throw apiErr;
    }
  }

  throw new Error(
    "Could not upload image to Supabase Storage. Please ensure the 'recipe-images' bucket is created and public in your Supabase Dashboard."
  );
}

// Upload recipe image to local API or Supabase Storage
export async function uploadRecipeImage(file: File): Promise<string> {
  // 1. Try local server upload first
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-recipe-image", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.url) return data.url;
    }
  } catch (apiErr) {
    console.warn("Local recipe image upload API route notice:", apiErr);
  }

  // 2. Try Supabase Storage fallback
  const supabase = getSupabaseClient();
  if (isSupabaseConfigured() && supabase) {
    try {
      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${Math.random().toString(36).substring(2, 12)}_${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("recipe-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: true });

      if (!error) {
        const { data } = supabase.storage
          .from("recipe-images")
          .getPublicUrl(fileName);
        return data.publicUrl;
      }
    } catch (sbErr) {
      console.warn("Supabase storage recipe image upload notice:", sbErr);
    }
  }

  return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80";
}

export interface RecipeFilters {
  query?: string;
  category?: string;
  dietary?: "All" | "Non-Veg" | "Pure Veg";
  ingredient?: string;
  sort?: "newest" | "prep_time" | "cook_time" | "title";
}

// Fetch all recipes with search, category filtering, ingredient matching & sorting
export async function fetchAllRecipes(filters?: RecipeFilters): Promise<Recipe[]> {
  let all: Recipe[] = [];

  const supabase = getSupabaseClient();
  if (isSupabaseConfigured() && supabase) {
    try {
      let q = supabase
        .from("recipes")
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `);

      if (filters?.category && filters.category !== "All") {
        q = q.eq("category", filters.category);
      }

      const { data, error } = await q;

      if (!error && data) {
        const dbRecipes: Recipe[] = data.map((row: any) => ({
          ...row,
          author_name: row.profiles?.full_name || "Community Chef",
          author_avatar: row.profiles?.avatar_url,
        }));
        all = [...dbRecipes];
      }
    } catch (err) {
      console.error("Error fetching Supabase recipes:", err);
    }
  }

  // Combine with custom recipes saved in demo/local mode
  const localRecipes = getLocalCustomRecipes();
  all = [...localRecipes, ...all, ...SEED_RECIPES];

  // De-duplicate by ID
  const map = new Map<string, Recipe>();
  for (const r of all) {
    if (!map.has(r.id)) {
      map.set(r.id, r);
    }
  }
  let results = Array.from(map.values());

  // Apply in-memory search and filters
  if (filters?.query?.trim()) {
    const q = filters.query.toLowerCase().trim();
    results = results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.some((ing) => ing.item.toLowerCase().includes(q))
    );
  }

  if (filters?.category && filters.category !== "All") {
    results = results.filter((r) => r.category.toLowerCase() === filters.category?.toLowerCase());
  }

  if (filters?.dietary && filters.dietary !== "All") {
    if (filters.dietary === "Non-Veg") {
      results = results.filter((r) =>
        r.dietary_tags?.some(
          (t) =>
            t.toLowerCase().includes("non-veg") ||
            t.toLowerCase().includes("chicken") ||
            t.toLowerCase().includes("fish") ||
            t.toLowerCase().includes("egg") ||
            t.toLowerCase().includes("mutton")
        ) ||
        r.title.toLowerCase().includes("chicken") ||
        r.title.toLowerCase().includes("fish") ||
        r.title.toLowerCase().includes("egg") ||
        r.title.toLowerCase().includes("mutton") ||
        r.title.toLowerCase().includes("biryani")
      );
    } else if (filters.dietary === "Pure Veg") {
      results = results.filter(
        (r) =>
          !r.dietary_tags?.some(
            (t) =>
              t.toLowerCase().includes("non-veg") ||
              t.toLowerCase().includes("chicken") ||
              t.toLowerCase().includes("fish") ||
              t.toLowerCase().includes("egg") ||
              t.toLowerCase().includes("mutton")
          ) &&
          !r.title.toLowerCase().includes("chicken") &&
          !r.title.toLowerCase().includes("fish") &&
          !r.title.toLowerCase().includes("egg") &&
          !r.title.toLowerCase().includes("mutton")
      );
    }
  }

  if (filters?.ingredient?.trim()) {
    const ing = filters.ingredient.toLowerCase().trim();
    results = results.filter((r) =>
      r.ingredients.some((item) => item.item.toLowerCase().includes(ing))
    );
  }

  // Sort results
  if (filters?.sort === "newest") {
    results.sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );
  } else if (filters?.sort === "prep_time") {
    results.sort((a, b) => a.prep_time - b.prep_time);
  } else if (filters?.sort === "cook_time") {
    results.sort((a, b) => a.cook_time - b.cook_time);
  } else if (filters?.sort === "title") {
    results.sort((a, b) => a.title.localeCompare(b.title));
  }

  return results;
}

// Fetch a single recipe by its ID
export async function fetchRecipeById(id: string): Promise<Recipe | null> {
  const supabase = getSupabaseClient();
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq("id", id)
        .single();

      if (!error && data) {
        return {
          ...data,
          author_name: (data as any).profiles?.full_name || "Community Chef",
          author_avatar: (data as any).profiles?.avatar_url,
        };
      }
    } catch (err) {
      console.error("Error fetching recipe from Supabase:", err);
    }
  }

  // Check local custom recipes
  const localList = getLocalCustomRecipes();
  const localFound = localList.find((r) => r.id === id);
  if (localFound) return localFound;

  // Check seed recipes
  const seedFound = SEED_RECIPES.find((r) => r.id === id);
  return seedFound || null;
}

// Create a new recipe
export async function createRecipe(
  recipeData: Omit<Recipe, "id" | "created_at" | "updated_at">,
  imageFile?: File
): Promise<Recipe> {
  let imageUrl = recipeData.image_url;

  if (imageFile) {
    imageUrl = await uploadRecipeImage(imageFile);
  }

  const supabase = getSupabaseClient();
  const isDemo = !recipeData.user_id || recipeData.user_id.startsWith("demo-") || recipeData.user_id.startsWith("user-");

  if (isSupabaseConfigured() && supabase && !isDemo) {
    const fullPayload: any = {
      user_id: recipeData.user_id,
      title: recipeData.title,
      description: recipeData.description,
      category: recipeData.category,
      prep_time: recipeData.prep_time,
      cook_time: recipeData.cook_time,
      servings: recipeData.servings,
      calories: recipeData.calories,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
      image_url: imageUrl,
      spice_level: recipeData.spice_level,
      dietary_tags: recipeData.dietary_tags,
    };

    let { data, error } = await supabase
      .from("recipes")
      .insert(fullPayload)
      .select()
      .single();

    if (error && (error.message?.includes("column") || error.code === "PGRST204" || error.code === "42703")) {
      console.warn("Retrying recipe insert with base columns (omitting optional columns):", error.message);
      const basePayload: any = {
        user_id: recipeData.user_id,
        title: recipeData.title,
        description: recipeData.description,
        category: recipeData.category,
        prep_time: recipeData.prep_time,
        cook_time: recipeData.cook_time,
        servings: recipeData.servings,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        image_url: imageUrl,
      };

      const retryRes = await supabase
        .from("recipes")
        .insert(basePayload)
        .select()
        .single();

      data = retryRes.data;
      error = retryRes.error;
    }

    if (error) {
      console.error("Supabase recipe insert error:", error);
      throw new Error(error.message);
    }

    return data as Recipe;
  }

  // Local demo fallback
  const newRecipe: Recipe = {
    ...recipeData,
    id: "custom-" + Math.random().toString(36).substring(2, 9),
    image_url: imageUrl,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const current = getLocalCustomRecipes();
  saveLocalCustomRecipes([newRecipe, ...current]);
  return newRecipe;
}

// Update an existing recipe
export async function updateRecipe(
  id: string,
  updates: Partial<Recipe>,
  imageFile?: File
): Promise<Recipe> {
  let finalUpdates = { ...updates };

  if (imageFile) {
    const imageUrl = await uploadRecipeImage(imageFile);
    finalUpdates.image_url = imageUrl;
  }

  const supabase = getSupabaseClient();
  if (isSupabaseConfigured() && supabase) {
    let { data, error } = await supabase
      .from("recipes")
      .update(finalUpdates)
      .eq("id", id)
      .select()
      .single();

    if (error && (error.message?.includes("column") || error.code === "PGRST204" || error.code === "42703")) {
      const sanitized: any = { ...finalUpdates };
      delete sanitized.calories;
      delete sanitized.spice_level;
      delete sanitized.dietary_tags;
      delete sanitized.updated_at;

      const retryRes = await supabase
        .from("recipes")
        .update(sanitized)
        .eq("id", id)
        .select()
        .single();

      data = retryRes.data;
      error = retryRes.error;
    }

    if (error) {
      throw new Error(error.message);
    }

    return data as Recipe;
  }

  // Local update fallback
  const list = getLocalCustomRecipes();
  const idx = list.findIndex((r) => r.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...finalUpdates, updated_at: new Date().toISOString() };
    saveLocalCustomRecipes(list);
    return list[idx];
  }

  throw new Error("Recipe not found or cannot be modified.");
}

// Delete a recipe
export async function deleteRecipe(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from("recipes").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  // Local delete fallback
  const list = getLocalCustomRecipes().filter((r) => r.id !== id);
  saveLocalCustomRecipes(list);
}
