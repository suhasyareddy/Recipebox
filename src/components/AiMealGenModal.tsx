"use client";

import React, { useState } from "react";
import Link from "next/link";

interface AiMealGenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiMealGenModal({ isOpen, onClose }: AiMealGenModalProps) {
  const [selectedMeal, setSelectedMeal] = useState("Lunch");
  const [cookingTime, setCookingTime] = useState("Under 30 mins");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    "Tomatoes",
    "Paneer",
    "Fresh Spinach",
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDish, setGeneratedDish] = useState<{
    title: string;
    description: string;
    time: string;
    cuisine: string;
    calories: string;
    recipeId: string;
  } | null>(null);

  if (!isOpen) return null;

  const availableIngredients = [
    "Tomatoes",
    "Potatoes",
    "Paneer",
    "Fresh Spinach",
    "Toor Dal",
    "Curd",
    "Basmati Rice",
    "Leftover Rice",
  ];

  const toggleIngredient = (item: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedDish(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedDish({
        title: "Homestyle Palak Paneer with Phulkas",
        description:
          "Tender blanched spinach puree simmered with hand-cubed malai paneer, toasted cumin, and a whisper of desi ghee.",
        time: "25 mins",
        cuisine: "North Indian",
        calories: "420 kcal",
        recipeId: "paneer-butter-masala",
      });
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5 border border-outline-variant/50 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            </span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Quick AI Meal Gen
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Smart homestyle Indian recommendation in seconds
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Controls */}
        <div className="flex flex-col gap-4">
          {/* Meal Slot */}
          <div>
            <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-1.5 font-bold">
              Meal Slot:
            </label>
            <div className="flex flex-wrap gap-2">
              {["Breakfast", "Lunch", "Dinner", "Kids Tiffin"].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedMeal(slot)}
                  className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                    selectedMeal === slot
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          <div>
            <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-1.5 font-bold">
              Available Cook Time:
            </label>
            <div className="flex flex-wrap gap-2">
              {["Under 15 mins", "Under 30 mins", "Under 45 mins"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setCookingTime(t)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                    cookingTime === t
                      ? "bg-secondary text-on-secondary shadow-sm"
                      : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Fridge Items on Hand */}
          <div>
            <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-1.5 font-bold">
              Items Currently in Your Kitchen:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableIngredients.map((item) => {
                const isSelected = selectedIngredients.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleIngredient(item)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                      isSelected
                        ? "bg-secondary-container text-on-secondary-container font-semibold"
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {isSelected ? "check" : "add"}
                    </span>
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Trigger */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full mt-2 py-3 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-label-md shadow-md flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isGenerating ? "animate-spin" : ""
              }`}
            >
              {isGenerating ? "progress_activity" : "auto_awesome"}
            </span>
            <span>
              {isGenerating
                ? "Finding Best Combination..."
                : "Generate Balanced Dish"}
            </span>
          </button>
        </div>

        {/* Generated Result */}
        {generatedDish && (
          <div className="p-4 rounded-xl bg-surface-container-low border border-secondary-container flex flex-col gap-2.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider bg-secondary-container/50 px-2 py-0.5 rounded-full">
                ✨ Top Pick for {selectedMeal}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {generatedDish.time} • {generatedDish.calories}
              </span>
            </div>
            <h4 className="font-title-lg text-title-lg text-on-surface">
              {generatedDish.title}
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {generatedDish.description}
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Link
                href={`/recipes/${generatedDish.recipeId}`}
                onClick={onClose}
                className="inline-flex items-center gap-1 px-4 py-1.5 bg-primary text-on-primary rounded-full font-label-md text-label-md hover:bg-primary-container transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>Cook This Recipe</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
