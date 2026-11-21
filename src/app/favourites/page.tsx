"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavourites } from "@/context/FavouritesContext";
import { useAuth } from "@/context/AuthContext";
import { fetchAllRecipes } from "@/lib/recipes";
import type { Recipe } from "@/lib/supabase/types";

export default function FavouritesPage() {
  const { user } = useAuth();
  const { favouriteIds, toggleFavourite, isFavourite } = useFavourites();
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const all = await fetchAllRecipes();
      const favs = all.filter((r) => favouriteIds.includes(r.id));
      setFavouriteRecipes(favs);
      setIsLoading(false);
    }
    load();
  }, [favouriteIds]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/30 pb-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <span className="material-symbols-outlined text-sm">favorite</span>
            Personal Saved Collection
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-on-surface">
            My Favourite Recipes
          </h1>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Quick access to the dishes your household loves the most. Add dishes directly to your weekly meal planner or cook right away.
          </p>
        </div>

        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm border border-outline-variant/30 transition-all self-start md:self-auto shrink-0"
        >
          <span className="material-symbols-outlined text-xl">search</span>
          <span>Browse More Recipes</span>
        </Link>
      </div>

      {/* Favourites Grid or Empty State */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">
            progress_activity
          </span>
          <p className="text-xs font-semibold text-on-surface-variant">Loading your saved recipes...</p>
        </div>
      ) : favouriteRecipes.length === 0 ? (
        <div className="bg-surface-container-lowest p-12 rounded-3xl border border-outline-variant/30 text-center space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">favorite_border</span>
          </div>
          <h2 className="font-editorial text-2xl font-bold text-on-surface">
            No Favourites Saved Yet
          </h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Click the heart icon on any recipe card or details page to bookmark your family&apos;s most cherished dishes here.
          </p>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-base">restaurant_menu</span>
            <span>Discover Recipes</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favouriteRecipes.map((r) => {
            const fav = isFavourite(r.id);
            return (
              <div
                key={r.id}
                className="group bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] bg-surface-container overflow-hidden">
                  <Image
                    src={r.image_url}
                    alt={r.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <span className="absolute top-3.5 left-3.5 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface px-3 py-1 rounded-full text-[11px] font-bold shadow-sm">
                    {r.category}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleFavourite(r)}
                    className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md bg-primary text-on-primary scale-105"
                    title="Remove from favourites"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      favorite
                    </span>
                  </button>

                  <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white/90 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {r.prep_time + r.cook_time} mins
                  </span>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] text-on-surface-variant font-medium">
                      <span>{r.servings} Servings</span>
                      <span>•</span>
                      <span>{r.spice_level || "Medium"}</span>
                      {r.calories && <span>• {r.calories} kcal</span>}
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
                      <span>Cook Dish</span>
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
