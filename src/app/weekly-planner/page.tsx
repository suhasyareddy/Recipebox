"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WEEKLY_SCHEDULE_DATA } from "@/data/recipes";
import { useAuth } from "@/context/AuthContext";
import { getWeekScheduleRange } from "@/lib/dateUtils";

export default function WeeklyPlannerPage() {
  const { profile, user } = useAuth();
  const firstName =
    profile?.full_name?.split(" ")[0] ||
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Chef";
  const [activeFilter, setActiveFilter] = useState("all");
  const [weekData, setWeekData] = useState(WEEKLY_SCHEDULE_DATA);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [offsetWeeks, setOffsetWeeks] = useState(0);

  const { weekLabel, days } = getWeekScheduleRange(offsetWeeks);

  const activeWeekData = weekData.map((item, idx) => {
    const computed = days[idx];
    return {
      ...item,
      date: computed ? computed.date : item.date,
      isToday: computed ? computed.isToday : false,
    };
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSwapSlot = (dayIndex: number, slot: "breakfast" | "lunch" | "dinner") => {
    setWeekData((prev) => {
      const updated = [...prev];
      const day = { ...updated[dayIndex] };
      if (slot === "breakfast") {
        day.breakfast = {
          ...day.breakfast,
          title: "Mysore Masala Dosa",
          subtitle: "With red chilli garlic chutney",
          time: "20m",
          tag: "Crispy Delight",
        };
      } else if (slot === "lunch") {
        day.lunch = {
          ...day.lunch,
          title: "Amritsari Rajma Masala",
          subtitle: "Slow-simmered kidney beans",
          time: "40m",
          tag: "Rich Gravy",
        };
      } else {
        day.dinner = {
          ...day.dinner,
          title: "Homestyle Palak Paneer",
          subtitle: "With whole wheat phulkas",
          time: "25m",
          tag: "Green Goodness",
        };
      }
      updated[dayIndex] = day;
      return updated;
    });
    showToast(`Smart Swapped dish with ${firstName}'s seasonal alternative!`);
  };

  const handleRegenerate = () => {
    showToast("✨ AI generated an optimal balanced 7-day Indian meal plan with zero repeats!");
  };

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

      <div className="flex flex-col w-full">
        {/* Top Command & Filter Deck */}
        <section className="w-full max-w-[1320px] mx-auto px-gutter pt-space-lg pb-space-md">
          {/* Header Row: Title & Week Picker */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-md border-b border-surface-container-high/40">
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">
                  calendar_month
                </span>
                <span>Rasoi Schedule • Kartik Maas</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-space-xs">
                Weekly Family Meal Planner
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Wholesome ghar ka khana orchestrated for warmth, variety, and zero kitchen fatigue.
              </p>
            </div>

            {/* Week Date Navigator */}
            <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-full shadow-sm border border-outline-variant/30">
              <button
                aria-label="Previous Week"
                onClick={() => {
                  setOffsetWeeks((p) => p - 1);
                  showToast("Loaded previous week timetable");
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_left
                </span>
              </button>
              <div className="flex items-center gap-space-xs px-space-xs">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  event_note
                </span>
                <span className="font-title-md text-title-md text-on-surface">
                  {weekLabel}
                </span>
              </div>
              <button
                aria-label="Next Week"
                onClick={() => {
                  setOffsetWeeks((p) => p + 1);
                  showToast("Loaded next week timetable");
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          {/* Filter Pills & Primary Tool Actions */}
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-md pt-space-md pb-space-xs">
            {/* Dietary & Mood Segment Pills */}
            <div className="flex flex-wrap items-center gap-space-xs">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all ${
                  activeFilter === "all"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
                type="button"
              >
                All Meals (21)
              </button>
              <button
                onClick={() => setActiveFilter("veg")}
                className={`px-space-md py-space-xs rounded-full font-label-md text-label-md flex items-center gap-space-xs transition-colors ${
                  activeFilter === "veg"
                    ? "bg-secondary text-on-secondary shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  eco
                </span>
                <span>Pure Veg</span>
              </button>
              <button
                onClick={() => setActiveFilter("kids")}
                className={`px-space-md py-space-xs rounded-full font-label-md text-label-md flex items-center gap-space-xs transition-colors ${
                  activeFilter === "kids"
                    ? "bg-tertiary-container text-on-tertiary-container shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  child_care
                </span>
                <span>Kids Friendly</span>
              </button>
              <button
                onClick={() => setActiveFilter("vrat")}
                className={`px-space-md py-space-xs rounded-full font-label-md text-label-md flex items-center gap-space-xs transition-colors ${
                  activeFilter === "vrat"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">
                  local_fire_department
                </span>
                <span>Fasting / Vrat</span>
              </button>
              <button
                onClick={() => setActiveFilter("quick")}
                className={`px-space-md py-space-xs rounded-full font-label-md text-label-md flex items-center gap-space-xs transition-colors ${
                  activeFilter === "quick"
                    ? "bg-secondary text-on-secondary shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  bolt
                </span>
                <span>Under 25 mins</span>
              </button>
            </div>

            {/* Action Cluster */}
            <div className="flex flex-wrap items-center gap-space-xs w-full xl:w-auto">
              <button
                onClick={() => handleSwapSlot(3, "lunch")}
                className="inline-flex items-center gap-space-xs bg-surface-container px-space-md py-space-sm rounded-full font-label-md text-label-md text-on-surface hover:bg-surface-container-high shadow-sm transition-all border border-outline-variant/30"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">
                  published_with_changes
                </span>
                <span>Smart Swap</span>
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-space-xs bg-surface-container px-space-md py-space-sm rounded-full font-label-md text-label-md text-on-surface hover:bg-surface-container-high shadow-sm transition-all border border-outline-variant/30"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>Print Timetable</span>
              </button>
              <Link
                href="/grocery-list"
                className="inline-flex items-center gap-space-xs bg-secondary text-on-secondary px-space-md py-space-sm rounded-full font-label-md text-label-md shadow-sm hover:opacity-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  shopping_basket
                </span>
                <span>Export to Bazaar List</span>
              </Link>
              <button
                onClick={handleRegenerate}
                className="inline-flex items-center gap-space-xs bg-primary text-on-primary px-space-md py-space-sm rounded-full font-label-md text-label-md shadow-md hover:bg-primary-container transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  auto_awesome
                </span>
                <span>AI Regenerate Full Week</span>
              </button>
            </div>
          </div>
        </section>

        {/* 7-Day Timetable Canvas */}
        <section className="w-full max-w-[1320px] mx-auto px-gutter py-space-sm">
          <div className="overflow-x-auto pb-space-lg">
            <div className="grid grid-cols-7 gap-space-sm min-w-[1160px]">
              {activeWeekData.map((dayItem, dayIdx) => {
                const isToday = dayItem.isToday;
                return (
                  <div
                    key={dayItem.day}
                    className={`flex flex-col rounded-xl p-space-xs gap-space-sm transition-all ${
                      isToday
                        ? "bg-surface-container border-2 border-primary shadow-md"
                        : "bg-surface-container-low border border-outline-variant/20"
                    }`}
                  >
                    {/* Day Header */}
                    <div
                      className={`p-space-sm rounded-lg shadow-sm flex flex-col ${
                        isToday ? "bg-primary text-on-primary" : "bg-surface"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-label-sm text-label-sm uppercase tracking-wider font-bold ${
                            isToday ? "text-primary-fixed" : "text-on-surface-variant"
                          }`}
                        >
                          {isToday ? "TODAY" : dayItem.day}
                        </span>
                        {isToday && (
                          <span className="text-[10px] font-label-sm bg-on-primary/20 px-1.5 py-0.5 rounded-full font-bold">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span
                          className={`font-title-lg text-title-lg ${
                            isToday ? "text-on-primary" : "text-on-surface"
                          }`}
                        >
                          {dayItem.date}
                        </span>
                        <span
                          className={`font-label-sm text-label-sm ${
                            isToday ? "text-primary-fixed" : "text-secondary"
                          }`}
                        >
                          3 Meals
                        </span>
                      </div>
                    </div>

                    {/* Cards Stack */}
                    <div className="flex flex-col gap-space-sm">
                      {/* Breakfast */}
                      <div className="group relative bg-surface-container-lowest rounded-lg p-space-sm shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-space-xs border border-outline-variant/20">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary">
                            <span className="material-symbols-outlined text-[14px]">
                              wb_twilight
                            </span>
                            Morning
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-full">
                            {dayItem.breakfast.time}
                          </span>
                        </div>
                        <div className="relative w-full h-24 rounded-lg overflow-hidden mt-space-xs bg-surface-container">
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            src={dayItem.breakfast.image}
                            alt={dayItem.breakfast.title}
                          />
                          <span className="absolute bottom-1 left-1 bg-surface/90 text-on-surface font-label-sm text-label-sm px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                            {dayItem.breakfast.tag}
                          </span>
                        </div>
                        <span className="font-title-md text-title-md text-on-surface leading-tight mt-1 line-clamp-1">
                          {dayItem.breakfast.title}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          {dayItem.breakfast.subtitle}
                        </span>

                        {/* Quick Action Bar On Hover */}
                        <div className="absolute inset-0 bg-surface-container-highest/95 rounded-lg opacity-0 group-hover:opacity-100 backdrop-blur-sm flex items-center justify-center gap-space-xs transition-opacity duration-150 p-space-xs">
                          <button
                            onClick={() => handleSwapSlot(dayIdx, "breakfast")}
                            className="w-8 h-8 rounded-full bg-surface text-primary shadow-sm hover:scale-110 flex items-center justify-center transition-transform"
                            title="Swap Meal"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              swap_horiz
                            </span>
                          </button>
                          <Link
                            href={`/recipes/${dayItem.breakfast.recipeId}`}
                            className="w-8 h-8 rounded-full bg-surface text-secondary shadow-sm hover:scale-110 flex items-center justify-center transition-transform"
                            title="View Recipe"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              menu_book
                            </span>
                          </Link>
                        </div>
                      </div>

                      {/* Lunch */}
                      <div className="group relative bg-surface-container-lowest rounded-lg p-space-sm shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-space-xs border border-outline-variant/20">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-space-xs font-label-sm text-label-sm text-primary">
                            <span className="material-symbols-outlined text-[14px]">
                              light_mode
                            </span>
                            Afternoon
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-full">
                            {dayItem.lunch.time}
                          </span>
                        </div>
                        <div className="relative w-full h-24 rounded-lg overflow-hidden mt-space-xs bg-surface-container">
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            src={dayItem.lunch.image}
                            alt={dayItem.lunch.title}
                          />
                          <span className="absolute bottom-1 left-1 bg-surface/90 text-on-surface font-label-sm text-label-sm px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                            {dayItem.lunch.tag}
                          </span>
                        </div>
                        <span className="font-title-md text-title-md text-on-surface leading-tight mt-1 line-clamp-1">
                          {dayItem.lunch.title}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          {dayItem.lunch.subtitle}
                        </span>

                        <div className="absolute inset-0 bg-surface-container-highest/95 rounded-lg opacity-0 group-hover:opacity-100 backdrop-blur-sm flex items-center justify-center gap-space-xs transition-opacity duration-150 p-space-xs">
                          <button
                            onClick={() => handleSwapSlot(dayIdx, "lunch")}
                            className="w-8 h-8 rounded-full bg-surface text-primary shadow-sm hover:scale-110 flex items-center justify-center transition-transform"
                            title="Swap Meal"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              swap_horiz
                            </span>
                          </button>
                          <Link
                            href={`/recipes/${dayItem.lunch.recipeId}`}
                            className="w-8 h-8 rounded-full bg-surface text-secondary shadow-sm hover:scale-110 flex items-center justify-center transition-transform"
                            title="View Recipe"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              menu_book
                            </span>
                          </Link>
                        </div>
                      </div>

                      {/* Dinner */}
                      <div className="group relative bg-surface-container-lowest rounded-lg p-space-sm shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-space-xs border border-outline-variant/20">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary">
                            <span className="material-symbols-outlined text-[14px]">
                              bedtime
                            </span>
                            Night
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-full">
                            {dayItem.dinner.time}
                          </span>
                        </div>
                        <div className="relative w-full h-24 rounded-lg overflow-hidden mt-space-xs bg-surface-container">
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            src={dayItem.dinner.image}
                            alt={dayItem.dinner.title}
                          />
                          <span className="absolute bottom-1 left-1 bg-surface/90 text-on-surface font-label-sm text-label-sm px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                            {dayItem.dinner.tag}
                          </span>
                        </div>
                        <span className="font-title-md text-title-md text-on-surface leading-tight mt-1 line-clamp-1">
                          {dayItem.dinner.title}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          {dayItem.dinner.subtitle}
                        </span>

                        <div className="absolute inset-0 bg-surface-container-highest/95 rounded-lg opacity-0 group-hover:opacity-100 backdrop-blur-sm flex items-center justify-center gap-space-xs transition-opacity duration-150 p-space-xs">
                          <button
                            onClick={() => handleSwapSlot(dayIdx, "dinner")}
                            className="w-8 h-8 rounded-full bg-surface text-primary shadow-sm hover:scale-110 flex items-center justify-center transition-transform"
                            title="Swap Meal"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              swap_horiz
                            </span>
                          </button>
                          <Link
                            href={`/recipes/${dayItem.dinner.recipeId}`}
                            className="w-8 h-8 rounded-full bg-surface text-secondary shadow-sm hover:scale-110 flex items-center justify-center transition-transform"
                            title="View Recipe"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              menu_book
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
