import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xl border-t border-surface-container-high/60">
      <div className="max-w-[1320px] mx-auto px-gutter py-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div className="flex flex-col text-center md:text-left gap-space-xs">
          <div className="flex items-center justify-center md:justify-start gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-primary">
              RecipeBox Meal Planner
            </span>
          </div>
          <p className="font-headline-sm italic text-headline-sm text-on-surface-variant max-w-lg">
            “Cooked with love, planned with ease. Made for Indian kitchens.”
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-space-md font-label-md text-label-md text-on-surface-variant">
          <Link
            className="hover:text-primary transition-colors"
            href="/weekly-planner"
          >
            Weekly Matrix
          </Link>
          <Link
            className="hover:text-primary transition-colors"
            href="/suggestions"
          >
            Pantry Ideas
          </Link>
          <Link
            className="hover:text-primary transition-colors"
            href="/grocery-list"
          >
            Smart Bazaar List
          </Link>
          <Link
            className="hover:text-primary transition-colors"
            href="/recipes"
          >
            Heritage Cookery
          </Link>
          <Link
            className="hover:text-primary transition-colors"
            href="/family-preferences"
          >
            Dietary Rituals
          </Link>
        </div>
      </div>
      <div className="max-w-[1320px] mx-auto px-gutter pb-space-lg flex flex-col sm:flex-row items-center justify-between text-on-surface-variant font-label-sm text-label-sm gap-space-sm border-t border-surface-container-high/40 pt-space-md">
        <p>© 2025 RecipeBox Meal Planner. Cherishing Indian Domestic Kitchens.</p>
        <p className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[16px] text-primary">
            favorite
          </span>
          Handcrafted for maternal warmth &amp; domestic calm
        </p>
      </div>
    </footer>
  );
}
