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
 * Renders the authentic Food Preference Indicator:
 * - Pure Veg: Emerald Green Square with Dot + Green Bold Tick Checkmark + Label
 * - Non-Veg: Crimson Red Square with Dot + Red Bold Tick Checkmark + Label
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

  const iconSizes = {
    sm: "text-[14px]",
    md: "text-[16px]",
    lg: "text-[18px]",
  };

  if (nonVeg) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-red-50/95 text-red-700 border border-red-300 shadow-xs backdrop-blur-md transition-all ${sizeClasses[size]} ${className}`}
        title="Non-Vegetarian (Selected)"
      >
        {/* Standard Indian Non-Veg Square with Red Dot */}
        <span className="w-3.5 h-3.5 rounded-[3px] border-2 border-red-600 flex items-center justify-center shrink-0 p-[1px] bg-white">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
        </span>
        {/* Red Tick Indicator */}
        <span
          className={`material-symbols-outlined font-black text-red-600 leading-none ${iconSizes[size]}`}
          style={{ fontVariationSettings: "'wght' 700" }}
        >
          check
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
      title="Pure Vegetarian (Selected)"
    >
      {/* Standard Indian Veg Square with Green Dot */}
      <span className="w-3.5 h-3.5 rounded-[3px] border-2 border-emerald-600 flex items-center justify-center shrink-0 p-[1px] bg-white">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
      </span>
      {/* Green Tick Indicator */}
      <span
        className={`material-symbols-outlined font-black text-emerald-600 leading-none ${iconSizes[size]}`}
        style={{ fontVariationSettings: "'wght' 700" }}
      >
        check
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
 * Supports Vegetarian vs Non-Vegetarian with instant Green Tick and Red Tick indicator updates.
 * Only the currently selected option displays the selected tick indicator.
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
          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
            !isCurrentNonVeg
              ? "bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/25 shadow-sm"
              : "bg-surface-container-low border-outline-variant/40 hover:bg-surface-container text-on-surface-variant opacity-80"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {/* Square Indicator */}
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

          {/* Green Tick / Check Indicator (Only when selected) */}
          {!isCurrentNonVeg ? (
            <div className="flex items-center gap-1 bg-emerald-600 text-white rounded-full px-2 py-0.5 text-[11px] font-bold shadow-xs">
              <span className="material-symbols-outlined text-sm font-black">check</span>
              <span>Selected</span>
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full border border-outline-variant/50"></div>
          )}
        </button>

        {/* Option 2: Non-Vegetarian */}
        <button
          type="button"
          onClick={() => onChange("Non-Vegetarian")}
          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
            isCurrentNonVeg
              ? "bg-red-50/90 border-red-500 ring-2 ring-red-500/25 shadow-sm"
              : "bg-surface-container-low border-outline-variant/40 hover:bg-surface-container text-on-surface-variant opacity-80"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {/* Square Indicator */}
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

          {/* Red Tick / Check Indicator (Only when selected) */}
          {isCurrentNonVeg ? (
            <div className="flex items-center gap-1 bg-red-600 text-white rounded-full px-2 py-0.5 text-[11px] font-bold shadow-xs">
              <span className="material-symbols-outlined text-sm font-black">check</span>
              <span>Selected</span>
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full border border-outline-variant/50"></div>
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
