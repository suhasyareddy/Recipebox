"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchAllRecipes } from "@/lib/recipes";
import { useFavourites } from "@/context/FavouritesContext";
import { useAuth } from "@/context/AuthContext";
import { DietaryBadge } from "@/components/DietaryBadge";
import type { Recipe } from "@/lib/supabase/types";

const CATEGORIES = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Desserts",
  "Traditional",
];

export default function RecipesCatalogPage() {
  const { isFavourite, toggleFavourite } = useFavourites();
  const { profile } = useAuth();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState<"All" | "Non-Veg" | "Pure Veg">("All");
  const [sortBy, setSortBy] = useState<"newest" | "prep_time" | "cook_time" | "title">("newest");

  // Auto-adapt to user profile diet preference on first load
  useEffect(() => {
    if (profile?.dietary_preference) {
      const p = profile.dietary_preference.toLowerCase();
      if (p.includes("non-veg") || p.includes("omnivore")) {
        setSelectedDiet("All");
      } else if (p.includes("veg")) {
        setSelectedDiet("Pure Veg");
      }
    }
  }, [profile?.dietary_preference]);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const data = await fetchAllRecipes({
        query: searchQuery,
        category: selectedCategory,
        dietary: selectedDiet,
        ingredient: ingredientSearch,
        sort: sortBy,
      });
      setRecipes(data);
      setIsLoading(false);
    }

    const debounceTimer = setTimeout(() => {
      load();
    }, 200);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCategory, selectedDiet, ingredientSearch, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/30 pb-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
            Heritage & Modern Collection
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-on-surface">
            Recipe Box
          </h1>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Explore authentic homestyle recipes, filter by pantry ingredients, and preserve your household culinary heritage.
          </p>
        </div>

        <Link
          href="/recipes/create"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-md transition-all self-start md:self-auto shrink-0"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          <span>Add New Recipe</span>
        </Link>
      </div>

      {/* Search, Ingredient & Sorting Controls */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Name & Title Search */}
          <div className="md:col-span-5 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes by name or description..."
              className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary placeholder:text-outline"
            />
          </div>

          {/* Ingredient Filter Search */}
          <div className="md:col-span-4 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-xl pointer-events-none">
              grocery
            </span>
            <input
              type="text"
              value={ingredientSearch}
              onChange={(e) => setIngredientSearch(e.target.value)}
              placeholder="Filter by ingredient (e.g. paneer, methi, dal)..."
              className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary placeholder:text-outline"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-tertiary text-xl pointer-events-none">
              sort
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-tertiary/40 focus:border-tertiary"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="prep_time">Sort: Fastest Prep Time</option>
              <option value="cook_time">Sort: Shortest Cook Time</option>
              <option value="title">Sort: Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category & Dietary Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-outline-variant/20">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dietary Selector Tabs with Red Tick for Non-Veg & Green Tick for Veg */}
          <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-2xl border border-outline-variant/30 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSelectedDiet("All")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDiet === "All"
                  ? "bg-surface-container-lowest text-on-surface shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              All Diets
            </button>
            <button
              type="button"
              onClick={() => setSelectedDiet("Pure Veg")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDiet === "Pure Veg"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-[2px] border border-current flex items-center justify-center p-[1px]">
                <span className="w-1 h-1 rounded-full bg-current"></span>
              </span>
              <span className="material-symbols-outlined text-[13px] font-bold">check</span>
              <span>Pure Veg</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedDiet("Non-Veg")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDiet === "Non-Veg"
                  ? "bg-red-600 text-white shadow-xs"
                  : "text-red-600 hover:bg-red-50"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-[2px] border border-current flex items-center justify-center p-[1px]">
                <span className="w-1 h-1 rounded-full bg-current"></span>
              </span>
              <span className="material-symbols-outlined text-[13px] font-bold">check</span>
              <span>Non-Veg</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Grid or Empty State */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">
            progress_activity
          </span>
          <p className="text-xs font-semibold text-on-surface-variant">Filtering recipes...</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="bg-surface-container-lowest p-12 rounded-3xl border border-outline-variant/30 text-center space-y-4 max-w-lg mx-auto">
          <span className="material-symbols-outlined text-5xl text-outline">search_off</span>
          <h2 className="font-editorial text-2xl font-bold text-on-surface">No Recipes Found</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            No dishes matched your search criteria. Try adjusting your ingredient keywords or clearing the category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setIngredientSearch("");
              setSelectedCategory("All");
            }}
            className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => {
            const fav = isFavourite(r.id);
            return (
              <div
                key={r.id}
                className="group bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
              >
                {/* Image Stage */}
                <div className="relative aspect-[16/10] bg-surface-container overflow-hidden">
                  <Image
                    src={r.image_url}
                    alt={r.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Category & Dietary Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10 flex-wrap">
                    <span className="bg-surface-container-lowest/90 backdrop-blur-md text-on-surface px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm">
                      {r.category}
                    </span>
                    <DietaryBadge tags={r.dietary_tags} title={r.title} />
                  </div>

                  {/* Favourite Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavourite(r);
                    }}
                    className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md backdrop-blur-md ${
                      fav
                        ? "bg-primary text-on-primary scale-105"
                        : "bg-surface-container-lowest/90 text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest"
                    }`}
                    aria-label="Add to favourites"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: fav ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Floating Cook Time */}
                  <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white/90 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {r.prep_time + r.cook_time} mins
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] text-on-surface-variant font-medium">
                      <span>{r.servings} Servings</span>
                      <span>•</span>
                      <span>{r.spice_level || "Medium"} Spice</span>
                      {r.calories && (
                        <>
                          <span>•</span>
                          <span>{r.calories} kcal</span>
                        </>
                      )}
                    </div>
                    <Link href={`/recipes/${r.id}`}>
                      <h2 className="font-editorial text-lg font-bold text-on-surface hover:text-primary transition-colors line-clamp-1">
                        {r.title}
                      </h2>
                    </Link>
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {r.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                    <span className="text-[11px] text-on-surface-variant font-semibold">
                      By {r.author_name || "Community Chef"}
                    </span>
                    <Link
                      href={`/recipes/${r.id}`}
                      className="text-xs font-bold text-primary hover:text-primary-container flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>View Recipe</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
