"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SAMPLE_RECIPES } from "@/data/recipes";
import { useAuth } from "@/context/AuthContext";

export default function SuggestionsPage() {
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(" ")[0] || "Chef";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedMeal, setSelectedMeal] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("Vegetarian");
  const [timeFilter, setTimeFilter] = useState("Any");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [pantryIngredients, setPantryIngredients] = useState<string[]>([
    "Tomatoes",
    "Potatoes",
    "Curd",
    "Paneer",
    "Methi leaves",
  ]);

  const [newIngredient, setNewIngredient] = useState("");
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const removePantryItem = (item: string) => {
    setPantryIngredients((prev) => prev.filter((i) => i !== item));
  };

  const addPantryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIngredient.trim() && !pantryIngredients.includes(newIngredient.trim())) {
      setPantryIngredients((prev) => [...prev, newIngredient.trim()]);
      setNewIngredient("");
      setIsAddingIngredient(false);
      showToast(`Added ${newIngredient} to your kitchen staples!`);
    }
  };

  // Filter recipes based on search and filters
  const filteredRecipes = SAMPLE_RECIPES.filter((r) => {
    const matchesSearch =
      searchQuery === "" ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ingredients.some((ing) => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCuisine =
      selectedCuisine === "All" || r.cuisine.toLowerCase() === selectedCuisine.toLowerCase();

    const matchesMeal =
      selectedMeal === "All" || r.mealType.toLowerCase() === selectedMeal.toLowerCase();

    return matchesSearch && matchesCuisine && matchesMeal;
  });

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-14rem)]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-on-surface text-surface px-5 py-3 rounded-full shadow-2xl font-label-md text-label-md flex items-center gap-2 animate-fadeIn border border-outline-variant/40">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative w-full overflow-hidden">
        {/* Subtle decorative ambient background glows */}
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-gradient-to-br from-primary-fixed/30 to-secondary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-96 -left-32 w-80 h-80 bg-gradient-to-tr from-tertiary-fixed/25 to-surface-container-high rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-[1320px] mx-auto px-gutter py-space-lg flex flex-col gap-space-lg relative z-10">
          {/* Editorial Page Heading & Intro Context */}
          <section className="flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md pt-space-xs">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <div className="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md bg-primary-fixed/40 px-space-md py-1 rounded-full w-fit">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>{firstName.toUpperCase()}&apos;S DAILY INSPIRATION</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight">
                What shall we cook today, beta?
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Discover nourishing homestyle Indian dishes shaped by what is already
                resting in your fridge, your cooking mood, and family cravings.
              </p>
            </div>

            {/* Quick Stats Pill Badge */}
            <div className="flex items-center gap-space-md bg-surface-container-lowest px-space-lg py-space-sm rounded-xl shadow-[0_4px_20px_-2px_rgba(44,34,30,0.04)] border border-outline-variant/30">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  342 Homestyle Recipes
                </span>
              </div>
              <div className="h-4 w-px bg-surface-container-high"></div>
              <div className="flex items-center gap-space-xs text-tertiary">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-label-md text-label-md font-semibold">
                  Chef-Tested Ratios
                </span>
              </div>
            </div>
          </section>

          {/* 1. Search Bar & Layered Filter Architecture */}
          <section className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_4px_20px_-2px_rgba(44,34,30,0.04)] border border-outline-variant/30">
            {/* Friendly Search Box */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-outline">
                <span className="material-symbols-outlined text-[24px]">search</span>
              </div>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface font-body-lg text-body-lg pl-12 pr-28 py-space-md rounded-xl transition-all placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/20"
                placeholder="Search dishes by ingredients e.g., 'paneer', 'toor dal', 'spinach', or 'leftover rice'..."
                type="text"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-28 pr-2 flex items-center text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
              <button
                className="absolute inset-y-1.5 right-1.5 px-space-md bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-lg transition-transform hover:-translate-y-0.5 flex items-center gap-1 shadow-sm"
                type="button"
              >
                <span>Explore</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Filter Clusters */}
            <div className="flex flex-col gap-space-sm pt-space-xs">
              {/* Filter Row 1: Cuisines */}
              <div className="flex items-center gap-space-sm flex-wrap">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider min-w-[75px] font-bold">
                  Cuisine:
                </span>
                <div className="flex flex-wrap items-center gap-space-xs">
                  {[
                    "All",
                    "South Indian",
                    "North Indian",
                    "Gujarati",
                    "Maharashtrian",
                    "Bengali",
                    "Indo-Chinese",
                  ].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCuisine(c)}
                      className={`px-space-md py-1 rounded-full font-label-md text-label-md transition-all ${
                        selectedCuisine === c
                          ? "bg-primary text-on-primary shadow-sm"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Row 2: Meal Type */}
              <div className="flex items-center gap-space-sm flex-wrap">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider min-w-[75px] font-bold">
                  Meal:
                </span>
                <div className="flex flex-wrap items-center gap-space-xs">
                  {[
                    "All",
                    "Breakfast",
                    "Lunch",
                    "Dinner",
                    "Evening Snacks",
                    "Kid's Tiffin",
                  ].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMeal(m)}
                      className={`px-space-md py-1 rounded-full font-label-md text-label-md transition-all ${
                        selectedMeal === m
                          ? "bg-secondary text-on-secondary shadow-sm"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Row 3: Dietary & Quick Modifiers */}
              <div className="flex items-center gap-space-sm flex-wrap pt-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider min-w-[75px] font-bold">
                  Dietary:
                </span>
                <div className="flex flex-wrap items-center gap-space-xs">
                  <button
                    onClick={() => setSelectedDiet("Vegetarian")}
                    className={`px-space-md py-1 rounded-full font-label-md text-label-md flex items-center gap-1 shadow-sm transition-all ${
                      selectedDiet === "Vegetarian"
                        ? "bg-secondary text-on-secondary"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">eco</span>
                    <span>Vegetarian</span>
                  </button>
                  <button
                    onClick={() => setSelectedDiet("Non-Veg")}
                    className={`px-space-md py-1 rounded-full font-label-md text-label-md transition-colors ${
                      selectedDiet === "Non-Veg"
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    Non-Veg
                  </button>
                  <button
                    onClick={() => setSelectedDiet("Jain")}
                    className={`px-space-md py-1 rounded-full font-label-md text-label-md transition-colors ${
                      selectedDiet === "Jain"
                        ? "bg-tertiary text-on-tertiary"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    Jain / No Onion-Garlic
                  </button>
                  <button
                    onClick={() => setSelectedDiet("High Fiber")}
                    className={`px-space-md py-1 rounded-full font-label-md text-label-md transition-colors ${
                      selectedDiet === "High Fiber"
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    High Fiber
                  </button>
                  <button
                    onClick={() => setSelectedDiet("Low Oil")}
                    className={`px-space-md py-1 rounded-full font-label-md text-label-md transition-colors ${
                      selectedDiet === "Low Oil"
                        ? "bg-secondary text-on-secondary"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    Low Oil
                  </button>
                </div>

                {/* Time & Difficulty Quick Toggles */}
                <div className="flex items-center gap-space-xs ml-auto pt-space-xs sm:pt-0">
                  <div className="flex items-center gap-1 bg-surface-container-low px-space-sm py-1 rounded-lg border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      schedule
                    </span>
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer"
                    >
                      <option value="Any">Cooking Time: Any</option>
                      <option value="15">Under 15 mins</option>
                      <option value="30">15-30 mins</option>
                      <option value="45">30-45 mins</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Pantry Match: What's In Your Fridge? */}
          <section className="bg-surface-container-low rounded-xl p-space-lg relative overflow-hidden shadow-[0_4px_20px_-2px_rgba(44,34,30,0.04)] border border-outline-variant/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed/20 rounded-bl-full pointer-events-none"></div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg relative z-10">
              <div className="flex flex-col gap-space-xs max-w-xl">
                <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[20px]">
                    kitchen
                  </span>
                  <span className="tracking-wide uppercase font-bold">
                    PANTRY MATCH MAKER
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  What's in your fridge right now?
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Tap the staples already in your kitchen baskets. RecipeBox calculates
                  minimal-waste, maximum-flavor pairing options instantly.
                </p>
              </div>

              {/* Result Prompt Highlight Box */}
              <div className="bg-surface-container-lowest px-space-lg py-space-md rounded-xl flex items-center gap-space-md shadow-sm border-l-4 border-l-primary border border-outline-variant/20">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">
                    soup_kitchen
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                    Fridge Match Engine
                  </span>
                  <p className="font-title-md text-title-md text-on-surface">
                    Based on{" "}
                    <span className="text-primary font-bold">
                      {pantryIngredients.length} ingredients
                    </span>{" "}
                    in your kitchen, we found{" "}
                    <span className="text-secondary font-bold">
                      {filteredRecipes.length} delicious
                    </span>{" "}
                    dishes!
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Pill Selector Row */}
            <div className="mt-space-md pt-space-sm flex flex-wrap items-center gap-space-xs">
              {pantryIngredients.map((ing) => (
                <button
                  key={ing}
                  type="button"
                  onClick={() => removePantryItem(ing)}
                  className="group flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-1.5 rounded-full text-secondary font-label-md text-label-md shadow-sm hover:bg-secondary-fixed/20 transition-all border border-outline-variant/20"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    check_circle
                  </span>
                  <span className="text-on-surface">{ing}</span>
                  <span className="material-symbols-outlined text-[14px] text-outline hover:text-error ml-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    close
                  </span>
                </button>
              ))}

              {isAddingIngredient ? (
                <form onSubmit={addPantryItem} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Type staple (e.g. Bhindi)"
                    className="px-3 py-1 bg-surface-container-lowest rounded-full font-label-md text-label-md border border-primary outline-none text-on-surface"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-1 rounded-full bg-primary text-on-primary hover:bg-primary-container"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingIngredient(false)}
                    className="p-1 rounded-full bg-surface-container text-on-surface-variant hover:text-error"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingIngredient(true)}
                  className="flex items-center gap-space-xs bg-surface-container px-space-md py-1.5 rounded-full font-label-md text-label-md text-primary hover:bg-primary-fixed transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>+ Add Ingredient</span>
                </button>
              )}

              <button
                onClick={() => {
                  setPantryIngredients([]);
                  showToast("Cleared pantry filter staples.");
                }}
                className="text-on-surface-variant font-label-sm text-label-sm underline hover:text-primary ml-auto transition-colors"
                type="button"
              >
                Clear all pantry filters
              </button>
            </div>
          </section>

          {/* 3. Dish Suggestions (3x3 Grid of Delicacies) */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-space-sm">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Recommended For You
                </h3>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Handpicked recipes for today's meal routine ({filteredRecipes.length})
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm bg-surface-container-lowest px-space-sm py-1 rounded-lg border border-outline-variant/30">
                <span>Sort by:</span>
                <span className="text-primary font-bold cursor-pointer flex items-center gap-0.5">
                  Best Pantry Match
                  <span className="material-symbols-outlined text-[16px]">
                    expand_more
                  </span>
                </span>
              </div>
            </div>

            {/* 3x3 Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {filteredRecipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(44,34,30,0.04)] hover:shadow-[0_12px_32px_-4px_rgba(44,34,30,0.08)] transition-all group border border-outline-variant/20"
                >
                  <div className="flex flex-col">
                    <div className="relative h-52 w-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={recipe.image}
                        alt={recipe.title}
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          Pure Veg
                        </span>
                        <span className="bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded-full font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1 shadow-sm">
                          <span className="material-symbols-outlined text-[13px] text-secondary">
                            check
                          </span>
                          Fridge Ready
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm text-on-surface font-bold flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[14px] text-tertiary">
                          star
                        </span>
                        <span>{recipe.rating}</span>
                      </div>
                    </div>

                    <div className="p-space-lg flex flex-col gap-space-xs">
                      {/* Metadata Row */}
                      <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="text-primary font-bold">
                          {recipe.cuisine}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">
                            timer
                          </span>{" "}
                          {recipe.cookTime}
                        </span>
                        <span>•</span>
                        <span className="text-secondary font-medium">Easy Prep</span>
                      </div>

                      <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-snug">
                        {recipe.title}
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mt-0.5">
                        {recipe.subtitle}
                      </p>

                      {/* Tags Row */}
                      <div className="flex flex-wrap items-center gap-space-xs mt-space-sm">
                        {recipe.dietaryTags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-secondary-fixed/25 text-on-secondary-fixed-variant px-space-sm py-0.5 rounded-full font-label-sm text-label-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-space-lg pb-space-lg pt-0 flex items-center justify-between gap-space-sm border-t border-surface-container-high/30 mt-2 pt-3">
                    <Link
                      href={`/recipes/${recipe.id}`}
                      className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-2.5 rounded-lg flex items-center justify-center gap-space-xs transition-transform hover:-translate-y-0.5 shadow-sm text-center"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        add_circle
                      </span>
                      <span>+ View &amp; Add to Plan</span>
                    </Link>
                    <button
                      onClick={() => showToast(`Saved ${recipe.title} to favorites!`)}
                      className="p-2.5 bg-surface-container-low hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors border border-outline-variant/20"
                      title="Bookmark Recipe"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        bookmark_border
                      </span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
