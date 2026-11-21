"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { fetchRecipeById, updateRecipe } from "@/lib/recipes";
import type { Recipe } from "@/lib/supabase/types";

export default function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Recipe["category"]>("Dinner");
  const [prepTime, setPrepTime] = useState<number>(15);
  const [cookTime, setCookTime] = useState<number>(30);
  const [servings, setServings] = useState<number>(4);
  const [calories, setCalories] = useState<number>(350);
  const [spiceLevel, setSpiceLevel] = useState<Recipe["spice_level"]>("Medium");
  const [dietaryTag, setDietaryTag] = useState<string>("Vegetarian");

  const [ingredients, setIngredients] = useState<
    Array<{ item: string; quantity: string; notes: string }>
  >([]);

  const [instructions, setInstructions] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState<string>("");

  useEffect(() => {
    async function load() {
      setIsLoadingRecipe(true);
      const recipe = await fetchRecipeById(id);
      if (!recipe) {
        setErrorMessage("Recipe not found.");
        setIsLoadingRecipe(false);
        return;
      }

      setTitle(recipe.title);
      setDescription(recipe.description || "");
      setCategory(recipe.category);
      setPrepTime(recipe.prep_time);
      setCookTime(recipe.cook_time);
      setServings(recipe.servings);
      setCalories(recipe.calories || 350);
      setSpiceLevel(recipe.spice_level || "Medium");
      setDietaryTag(recipe.dietary_tags?.[0] || "Vegetarian");
      setImagePreview(recipe.image_url);

      setIngredients(
        recipe.ingredients.length > 0
          ? recipe.ingredients.map((ing) => ({
              item: ing.item,
              quantity: ing.quantity,
              notes: ing.notes || "",
            }))
          : [{ item: "", quantity: "", notes: "" }]
      );

      setInstructions(
        recipe.instructions.length > 0 ? recipe.instructions : [""]
      );

      setIsLoadingRecipe(false);
    }

    load();
  }, [id]);

  const handleIngredientChange = (
    index: number,
    field: "item" | "quantity" | "notes",
    val: string
  ) => {
    const updated = [...ingredients];
    updated[index][field] = val;
    setIngredients(updated);
  };

  const addIngredientRow = () => {
    setIngredients([...ingredients, { item: "", quantity: "", notes: "" }]);
  };

  const removeIngredientRow = (index: number) => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index: number, val: string) => {
    const updated = [...instructions];
    updated[index] = val;
    setInstructions(updated);
  };

  const addInstructionRow = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstructionRow = (index: number) => {
    if (instructions.length <= 1) return;
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage("Please enter a recipe title.");
      return;
    }

    const filteredIngredients = ingredients.filter((i) => i.item.trim() !== "");
    const filteredInstructions = instructions.filter((i) => i.trim() !== "");

    setIsSaving(true);
    try {
      const finalImage = customImageUrl.trim() ? customImageUrl.trim() : imagePreview;

      await updateRecipe(
        id,
        {
          title: title.trim(),
          description: description.trim(),
          category,
          prep_time: Number(prepTime),
          cook_time: Number(cookTime),
          servings: Number(servings),
          calories: Number(calories),
          spice_level: spiceLevel,
          dietary_tags: [dietaryTag],
          ingredients: filteredIngredients,
          instructions: filteredInstructions,
          image_url: finalImage,
        },
        imageFile || undefined
      );

      showToast("success", "Recipe Updated!", `${title} has been successfully saved.`);
      router.push(`/recipes/${id}`);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to update recipe.");
      showToast("error", "Update Failed", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingRecipe) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">
          progress_activity
        </span>
        <p className="text-sm text-on-surface-variant font-medium">Loading recipe details...</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-14 space-y-8">
      {/* Breadcrumb */}
      <div className="space-y-2">
        <Link
          href={`/recipes/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline uppercase tracking-wider"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Cancel and Return to Recipe
        </Link>
        <h1 className="font-editorial text-3xl sm:text-4xl text-on-surface font-semibold">
          Edit Recipe
        </h1>
        <p className="text-on-surface-variant text-sm">
          Update measurements, ingredients, and preparation techniques for this dish.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-sm text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-lg shrink-0">error</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Overview */}
        <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 space-y-6 shadow-sm">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">edit_note</span>
            Recipe Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Recipe Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm text-on-surface"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm text-on-surface resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Recipe["category"])}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 text-sm text-on-surface"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks / Tiffin</option>
                <option value="Desserts">Desserts / Mithai</option>
                <option value="Traditional">Traditional / Heritage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Spice Level
              </label>
              <select
                value={spiceLevel}
                onChange={(e) => setSpiceLevel(e.target.value as Recipe["spice_level"])}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 text-sm text-on-surface"
              >
                <option value="Mild">Mild</option>
                <option value="Medium">Medium</option>
                <option value="Spicy">Spicy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Prep Time (minutes)
              </label>
              <input
                type="number"
                min={1}
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 text-sm text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Cook Time (minutes)
              </label>
              <input
                type="number"
                min={1}
                value={cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 text-sm text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Servings
              </label>
              <input
                type="number"
                min={1}
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 text-sm text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Dietary Tag
              </label>
              <select
                value={dietaryTag}
                onChange={(e) => setDietaryTag(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 text-sm text-on-surface"
              >
                <option value="Vegetarian">Pure Vegetarian</option>
                <option value="Satvik / Jain">Satvik / Jain</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="High-Protein">High-Protein</option>
              </select>
            </div>
          </div>
        </section>

        {/* Photo */}
        <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">image</span>
            Update Dish Photo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {imagePreview && (
              <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/30 shadow-inner">
                <Image
                  src={imagePreview}
                  alt="Dish preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="md:col-span-2 space-y-3">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Upload New Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="w-full text-xs text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-primary-container cursor-pointer"
              />
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Or External Image URL
                </label>
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => {
                    setCustomImageUrl(e.target.value);
                    if (e.target.value.trim()) setImagePreview(e.target.value.trim());
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 bg-surface-container-low rounded-xl border border-outline-variant/40 text-xs text-on-surface"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients */}
        <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">grocery</span>
              Ingredients List
            </h2>
            <button
              type="button"
              onClick={addIngredientRow}
              className="text-xs font-bold text-primary hover:text-primary-container flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Add Row
            </button>
          </div>

          <div className="space-y-3">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs font-bold text-outline w-5 text-right shrink-0">
                  {idx + 1}.
                </span>
                <input
                  type="text"
                  placeholder="Ingredient"
                  value={ing.item}
                  onChange={(e) => handleIngredientChange(idx, "item", e.target.value)}
                  className="flex-2 px-3 py-2 bg-surface-container-low rounded-xl border border-outline-variant/40 text-xs text-on-surface"
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ing.quantity}
                  onChange={(e) => handleIngredientChange(idx, "quantity", e.target.value)}
                  className="flex-1 px-3 py-2 bg-surface-container-low rounded-xl border border-outline-variant/40 text-xs text-on-surface"
                />
                <input
                  type="text"
                  placeholder="Notes (optional)"
                  value={ing.notes}
                  onChange={(e) => handleIngredientChange(idx, "notes", e.target.value)}
                  className="hidden sm:block flex-1 px-3 py-2 bg-surface-container-low rounded-xl border border-outline-variant/40 text-xs text-on-surface"
                />
                <button
                  type="button"
                  onClick={() => removeIngredientRow(idx)}
                  disabled={ingredients.length <= 1}
                  className="p-1.5 text-outline hover:text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-30 shrink-0"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">format_list_numbered</span>
              Instructions
            </h2>
            <button
              type="button"
              onClick={addInstructionRow}
              className="text-xs font-bold text-secondary hover:text-secondary-container flex items-center gap-1 bg-secondary/10 px-3 py-1.5 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Add Step
            </button>
          </div>

          <div className="space-y-3">
            {instructions.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 sm:gap-3">
                <span className="text-xs font-bold text-outline w-6 pt-2 text-right shrink-0">
                  {idx + 1}.
                </span>
                <textarea
                  rows={2}
                  value={step}
                  onChange={(e) => handleInstructionChange(idx, e.target.value)}
                  className="flex-1 px-3 py-2 bg-surface-container-low rounded-xl border border-outline-variant/40 text-xs text-on-surface resize-none"
                />
                <button
                  type="button"
                  onClick={() => removeInstructionRow(idx)}
                  disabled={instructions.length <= 1}
                  className="p-1.5 mt-1 text-outline hover:text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-30 shrink-0"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href={`/recipes/${id}`}
            className="px-6 py-3 rounded-xl border border-outline-variant/50 text-xs font-bold text-on-surface hover:bg-surface-container transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">check</span>
                <span>Update Recipe</span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
