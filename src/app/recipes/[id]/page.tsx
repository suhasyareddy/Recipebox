"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchRecipeById, deleteRecipe } from "@/lib/recipes";
import { useAuth } from "@/context/AuthContext";
import { useFavourites } from "@/context/FavouritesContext";
import { useToast } from "@/context/ToastContext";
import { DietaryBadge } from "@/components/DietaryBadge";
import type { Recipe } from "@/lib/supabase/types";

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const recipeId = unwrappedParams.id;
  const router = useRouter();

  const { user } = useAuth();
  const { isFavourite, toggleFavourite } = useFavourites();
  const { showToast } = useToast();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [servings, setServings] = useState(4);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Kitchen Timer State
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 mins
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const data = await fetchRecipeById(recipeId);
      if (data) {
        setRecipe(data);
        setServings(data.servings || 4);
      }
      setIsLoading(false);
    }
    load();
  }, [recipeId]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      showToast("info", "⏰ Kitchen Timer Finished!", "Check the pan or tadka!");
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, showToast]);

  const toggleStepDone = (idx: number) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((s) => s !== idx) : [...prev, idx]
    );
  };

  const scaleQty = (baseQtyStr: string) => {
    if (!recipe) return baseQtyStr;
    const match = baseQtyStr.match(/^([\d.]+)\s*(.*)$/);
    if (!match) return baseQtyStr;
    const num = parseFloat(match[1]);
    const unit = match[2];
    const ratio = servings / (recipe.servings || 4);
    const scaled = num * ratio;
    const formatted = scaled % 1 === 0 ? scaled : scaled.toFixed(1);
    return `${formatted} ${unit}`.trim();
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins}:${remainingSec < 10 ? "0" : ""}${remainingSec}`;
  };

  const handleDelete = async () => {
    if (!recipe) return;
    setIsDeleting(true);
    try {
      await deleteRecipe(recipe.id);
      showToast("success", "Recipe Deleted", `${recipe.title} has been removed.`);
      router.push("/recipes");
    } catch (err: any) {
      showToast("error", "Failed to delete", err.message);
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">
          progress_activity
        </span>
        <p className="text-sm font-semibold text-on-surface-variant">
          Retrieving recipe from Amma&apos;s kitchen...
        </p>
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="material-symbols-outlined text-5xl text-outline">menu_book</span>
        <h1 className="font-editorial text-2xl font-bold text-on-surface">Recipe Not Found</h1>
        <p className="text-xs text-on-surface-variant">
          The dish you are looking for might have been moved or removed.
        </p>
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Browse All Recipes
        </Link>
      </main>
    );
  }

  const isOwner = Boolean(
    user && (user.id === recipe.user_id || recipe.user_id === "demo-amma-lakshmi-id")
  );

  const favorited = isFavourite(recipe.id);

  return (
    <main className="w-full pt-6 sm:pt-10 pb-16 bg-surface min-h-screen">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* Breadcrumb & Author Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
            <Link href="/recipes" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Recipes
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface">{recipe.category}</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary truncate max-w-[200px] sm:max-w-none font-bold">
              {recipe.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            {/* Owner Actions */}
            {isOwner && (
              <>
                <Link
                  href={`/recipes/${recipe.id}/edit`}
                  className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold flex items-center gap-1.5 border border-outline-variant/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-primary">edit</span>
                  Edit Recipe
                </Link>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-primary/10 hover:bg-primary/15 text-primary text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                  Delete
                </button>
              </>
            )}

            {/* Share */}
            <button
              aria-label="Share Recipe"
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast("info", "Link Copied!", "Recipe URL copied to clipboard.");
                }
              }}
              className="p-2 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors border border-outline-variant/20"
              type="button"
              title="Share Recipe"
            >
              <span className="material-symbols-outlined text-lg">share</span>
            </button>
          </div>
        </div>

        {/* Hero Showcase Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Showcase */}
          <div className="lg:col-span-7 flex flex-col relative rounded-3xl overflow-hidden bg-surface-container shadow-md group min-h-[380px] sm:min-h-[460px] border border-outline-variant/30">
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent pointer-events-none" />

            {/* Floating Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
              <DietaryBadge tags={recipe.dietary_tags} title={recipe.title} size="md" />
              <span className="bg-surface-container-lowest/90 backdrop-blur-md text-on-surface px-3 py-1 rounded-full text-xs shadow-sm font-bold">
                {recipe.category}
              </span>
            </div>

            {/* Favourite Button */}
            <div className="absolute top-4 right-4">
              <button
                type="button"
                onClick={() => toggleFavourite(recipe)}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-md ${
                  favorited
                    ? "bg-primary text-on-primary scale-105 ring-2 ring-primary-fixed"
                    : "bg-surface-container-lowest/90 text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest"
                }`}
                aria-label="Add to favourites"
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: favorited ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* Hero Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 text-white">
              <div className="flex items-center gap-3 text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  {recipe.prep_time + recipe.cook_time} mins total
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">local_fire_department</span>
                  {recipe.calories || 350} kcal
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-tertiary-fixed">
                    whatshot
                  </span>
                  {recipe.spice_level || "Medium"} Spice
                </span>
              </div>
              <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-sm">
                {recipe.title}
              </h1>
            </div>
          </div>

          {/* Right: Recipe Metadata & Amma's Guidance */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col justify-between flex-1 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-primary/20 shrink-0">
                    <Image
                      src={
                        recipe.author_avatar ||
                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                      }
                      alt="Chef"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Family Recipe By
                    </p>
                    <p className="text-base font-bold text-on-surface">
                      {recipe.author_name || "Amma Lakshmi"}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed italic border-l-2 border-primary/40 pl-3">
                  &ldquo;{recipe.description}&rdquo;
                </p>
              </div>

              {/* Kitchen Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 text-center">
                <div>
                  <span className="material-symbols-outlined text-primary text-xl">timer</span>
                  <p className="text-xs font-bold text-on-surface mt-1">{recipe.prep_time}m</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Prep</p>
                </div>
                <div>
                  <span className="material-symbols-outlined text-secondary text-xl">skillet</span>
                  <p className="text-xs font-bold text-on-surface mt-1">{recipe.cook_time}m</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Cook</p>
                </div>
                <div>
                  <span className="material-symbols-outlined text-tertiary text-xl">group</span>
                  <p className="text-xs font-bold text-on-surface mt-1">{servings} ppl</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Servings</p>
                </div>
              </div>

              {/* Interactive Servings Scaler */}
              <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl border border-outline-variant/30">
                <div>
                  <p className="text-xs font-bold text-on-surface">Portions Scaler</p>
                  <p className="text-[11px] text-on-surface-variant">Adjusts ingredient measures</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setServings((s) => Math.max(1, s - 1))}
                    className="w-8 h-8 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center font-bold shadow-sm"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm w-4 text-center">{servings}</span>
                  <button
                    type="button"
                    onClick={() => setServings((s) => s + 1)}
                    className="w-8 h-8 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center font-bold shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Kitchen Countdown Timer Toggle */}
              <div className="pt-2">
                {!showTimer ? (
                  <button
                    type="button"
                    onClick={() => setShowTimer(true)}
                    className="w-full py-3 px-4 rounded-xl border border-secondary/30 bg-secondary/10 hover:bg-secondary/15 text-secondary text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <span className="material-symbols-outlined text-base">hourglass_top</span>
                    Open Live Kitchen Timer
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary text-2xl">
                        timer
                      </span>
                      <div>
                        <p className="font-mono text-xl font-bold text-secondary">
                          {formatTimer(timerSeconds)}
                        </p>
                        <p className="text-[10px] text-secondary/80 uppercase tracking-wider">
                          Active Simmer
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsTimerRunning((r) => !r)}
                        className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary font-bold text-xs"
                      >
                        {isTimerRunning ? "Pause" : "Start"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsTimerRunning(false);
                          setTimerSeconds(300);
                        }}
                        className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-sm">replay</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Recipe Body: Ingredients & Step-by-Step */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Ingredients Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-editorial text-2xl font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">grocery</span>
                  Ingredients
                </h2>
                <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                  {recipe.ingredients.length} items
                </span>
              </div>

              <div className="divide-y divide-outline-variant/20">
                {recipe.ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex items-baseline justify-between text-xs sm:text-sm gap-2"
                  >
                    <div>
                      <span className="font-bold text-on-surface">{ing.item}</span>
                      {ing.notes && (
                        <span className="block text-[11px] text-on-surface-variant italic">
                          ({ing.notes})
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-primary shrink-0 bg-primary/10 px-2.5 py-1 rounded-lg">
                      {scaleQty(ing.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-editorial text-2xl font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">
                    format_list_numbered
                  </span>
                  Cooking Instructions
                </h2>
                <span className="text-xs font-bold text-secondary">
                  {completedSteps.length} / {recipe.instructions.length} Done
                </span>
              </div>

              <div className="space-y-4">
                {recipe.instructions.map((step, idx) => {
                  const isDone = completedSteps.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleStepDone(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isDone
                          ? "bg-secondary/5 border-secondary/30 opacity-70"
                          : "bg-surface-container-low border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container"
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isDone
                            ? "bg-secondary text-on-secondary"
                            : "border-2 border-outline text-transparent"
                        }`}
                        aria-label={`Step ${idx + 1}`}
                      >
                        <span className="material-symbols-outlined text-sm font-bold">check</span>
                      </button>

                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                          Step {idx + 1}
                        </span>
                        <p
                          className={`text-xs sm:text-sm leading-relaxed ${
                            isDone ? "line-through text-on-surface-variant" : "text-on-surface"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest max-w-md w-full p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-editorial text-2xl font-bold text-on-surface">Delete Recipe?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Are you sure you want to delete <strong>{recipe.title}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 rounded-xl border border-outline-variant/40 text-xs font-bold text-on-surface hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Recipe"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
