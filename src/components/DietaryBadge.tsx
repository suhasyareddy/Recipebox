"use client";

import React from "react";

interface DietaryBadgeProps {
  isNonVeg?: boolean;
  preference?: string | null;
  tags?: string[];
  title?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

/**
 * Determines whether a dish or dietary preference is Non-Vegetarian.
 */
export function isDishNonVeg(
  tags?: string[] | null,
  title?: string | null,
  preference?: string | null
): boolean {
  if (preference) {
    const pref = preference.toLowerCase();
    if (pref.includes("non") || pref.includes("omnivore") || pref.includes("meat")) {
      return true;
    }
    if (pref.includes("veg") && !pref.includes("non")) {
      return false;
    }
  }

  if (!tags && !title) return false;
  const list = (tags || []).map((t) => t.toLowerCase());
  const t = (title || "").toLowerCase();

  return (
    list.some(
      (tag) =>
        tag.includes("non-veg") ||
        tag.includes("chicken") ||
        tag.includes("mutton") ||
        tag.includes("fish") ||
        tag.includes("egg") ||
        tag.includes("seafood") ||
        tag.includes("prawn") ||
        tag.includes("omnivore")
    ) ||
    t.includes("chicken") ||
    t.includes("mutton") ||
    t.includes("fish") ||
    t.includes("egg") ||
    t.includes("biryani") ||
    t.includes("murgh") ||
    t.includes("prawn")
  );
}

/**
 * Renders the clean Food Preference Indicator without any tick/check icons:
 * - Pure Veg: Emerald Green Square with Dot + Label
 * - Non-Veg: Crimson Red Square with Dot + Label
 */
export function DietaryBadge({
  isNonVeg,
  preference,
  tags,
  title,
  className = "",
  size = "sm",
  showLabel = true,
}: DietaryBadgeProps) {
  let nonVeg: boolean;
  if (isNonVeg !== undefined) {
    nonVeg = isNonVeg;
  } else if (preference) {
    nonVeg = isDishNonVeg(null, null, preference);
  } else {
    nonVeg = isDishNonVeg(tags, title);
  }

  const labelText = preference
    ? preference
    : nonVeg
    ? "Non-Veg"
    : "Pure Veg";

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm",
  };

  const boxSizes = {
    sm: "w-3.5 h-3.5 rounded-[3px]",
    md: "w-4 h-4 rounded-[4px]",
    lg: "w-4.5 h-4.5 rounded-[4px]",
  };

  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  if (nonVeg) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-red-50/95 text-red-700 border border-red-300 shadow-xs backdrop-blur-md transition-all ${sizeClasses[size]} ${className}`}
        title="Non-Vegetarian"
      >
        {/* Standard Indian Non-Veg Red Box with Red Dot (No Tick Marks) */}
        <span className={`${boxSizes[size]} border-2 border-red-600 flex items-center justify-center shrink-0 p-[1px] bg-white`}>
          <span className={`${dotSizes[size]} rounded-full bg-red-600`}></span>
        </span>
        {showLabel && (
          <span className="text-red-700 font-extrabold tracking-tight">
            {labelText}
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-emerald-50/95 text-emerald-800 border border-emerald-300 shadow-xs backdrop-blur-md transition-all ${sizeClasses[size]} ${className}`}
      title="Pure Vegetarian"
    >
      {/* Standard Indian Veg Green Box with Green Dot (No Tick Marks) */}
      <span className={`${boxSizes[size]} border-2 border-emerald-600 flex items-center justify-center shrink-0 p-[1px] bg-white`}>
        <span className={`${dotSizes[size]} rounded-full bg-emerald-600`}></span>
      </span>
      {showLabel && (
        <span className="text-emerald-800 font-extrabold tracking-tight">
          {labelText}
        </span>
      )}
    </span>
  );
}

interface DietaryPreferenceSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Interactive Dietary Preference Selection Component
 * Supports Vegetarian vs Non-Vegetarian.
 * Clean design: Green Box for Vegetarian, Red Box for Non-Vegetarian.
 * No tick marks, check icons or additional symbols.
 */
export function DietaryPreferenceSelector({
  value,
  onChange,
  className = "",
}: DietaryPreferenceSelectorProps) {
  const isCurrentNonVeg = isDishNonVeg(null, null, value);

  return (
    <div className={`space-y-2.5 ${className}`}>
      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
        Food Preference
      </label>

      {/* Two Primary Interactive Options: Vegetarian vs Non-Vegetarian */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Option 1: Vegetarian */}
        <button
          type="button"
          onClick={() => onChange("Vegetarian")}
          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            !isCurrentNonVeg
              ? "bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/25 shadow-sm"
              : "bg-surface-container-low border-outline-variant/40 hover:bg-surface-container text-on-surface-variant opacity-75"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {/* Green Selection Box (No Tick Marks) */}
            <span className="w-4 h-4 rounded-[4px] border-2 border-emerald-600 flex items-center justify-center shrink-0 p-[1px] bg-white">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            </span>
            <div className="flex flex-col">
              <span className={`text-xs font-extrabold ${!isCurrentNonVeg ? "text-emerald-900" : "text-on-surface"}`}>
                Vegetarian
              </span>
              <span className="text-[10px] text-on-surface-variant">
                100% Meat-free homestyle dishes
              </span>
            </div>
          </div>

          {/* Clean Selection Highlight (No Tick Mark) */}
          {!isCurrentNonVeg ? (
            <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-200/60 px-2.5 py-0.5 rounded-full border border-emerald-400/40">
              Selected
            </span>
          ) : (
            <div className="w-4 h-4 rounded-full border border-outline-variant/40"></div>
          )}
        </button>

        {/* Option 2: Non-Vegetarian */}
        <button
          type="button"
          onClick={() => onChange("Non-Vegetarian")}
          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            isCurrentNonVeg
              ? "bg-red-50/90 border-red-500 ring-2 ring-red-500/25 shadow-sm"
              : "bg-surface-container-low border-outline-variant/40 hover:bg-surface-container text-on-surface-variant opacity-75"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {/* Red Selection Box (No Tick Marks) */}
            <span className="w-4 h-4 rounded-[4px] border-2 border-red-600 flex items-center justify-center shrink-0 p-[1px] bg-white">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
            </span>
            <div className="flex flex-col">
              <span className={`text-xs font-extrabold ${isCurrentNonVeg ? "text-red-900" : "text-on-surface"}`}>
                Non-Vegetarian
              </span>
              <span className="text-[10px] text-on-surface-variant">
                Chicken, fish, egg &amp; meat dishes
              </span>
            </div>
          </div>

          {/* Clean Selection Highlight (No Tick Mark) */}
          {isCurrentNonVeg ? (
            <span className="text-[11px] font-extrabold text-red-800 bg-red-200/60 px-2.5 py-0.5 rounded-full border border-red-400/40">
              Selected
            </span>
          ) : (
            <div className="w-4 h-4 rounded-full border border-outline-variant/40"></div>
          )}
        </button>
      </div>

      {/* Sub-variant selection (Jain, Vegan, Eggetarian) */}
      <div className="flex items-center justify-between pt-1 text-[11px] text-on-surface-variant">
        <span>Specific diet variant:</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-surface-container px-2 py-1 rounded-lg border border-outline-variant/40 text-xs font-semibold text-on-surface"
        >
          <option value="Vegetarian">Pure Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian (Chicken, Fish, Meat)</option>
          <option value="Eggetarian">Eggetarian</option>
          <option value="Vegan">Vegan (Zero Dairy)</option>
          <option value="Jain">Jain (Satvik, No Root Veg)</option>
        </select>
      </div>
    </div>
  );
}
