"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiMealGenModal } from "@/components/AiMealGenModal";
import { useAuth } from "@/context/AuthContext";
import { DietaryBadge, isDishNonVeg } from "@/components/DietaryBadge";
import { getTodayBannerDisplay } from "@/lib/dateUtils";

const VEG_MEALS = [
  {
    id: "breakfast",
    slot: "Breakfast • 8:30 AM",
    calories: "320 kcal",
    cookTime: "25 Mins Cook",
    title: "Soft Idlis & Vegetable Sambar with Fresh Coconut Chutney",
    desc: "Naturally fermented lentil batter steamed to pillowy perfection, served with slow-cooked drumstick & shallot sambar.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    tags: ["Pure Veg", "South Indian", "High Protein"],
    recipeId: "soft-idlis-sambar",
    topBarColor: "from-primary to-primary-container",
    slotBadgeBg: "bg-primary/10 text-primary",
    isNonVeg: false,
    swapped: false,
  },
  {
    id: "lunch",
    slot: "Lunch • 1:30 PM",
    calories: "540 kcal",
    cookTime: "40 Mins Cook",
    title: "Phulka Rotis with Paneer Butter Masala, Tadka Dal & Raita",
    desc: "Hand-rolled wheat phulkas brushed with golden desi ghee, cottage cheese in mild tomato gravy, and tempered toor dal.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    tags: ["Pure Veg", "North Indian", "Comfort Food"],
    recipeId: "paneer-butter-masala",
    topBarColor: "from-tertiary to-tertiary-container",
    slotBadgeBg: "bg-tertiary-fixed/50 text-on-tertiary-fixed",
    isNonVeg: false,
    swapped: false,
  },
  {
    id: "dinner",
    slot: "Dinner • 8:00 PM",
    calories: "380 kcal",
    cookTime: "20 Mins Cook",
    title: "Light Vegetable Khichdi with Roasted Papad, Pickle & Curd",
    desc: "Wholesome yellow moong dal and rice infused with cumin, ginger, turmeric and garden vegetables. Easy on digestion for restful sleep.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    tags: ["Gut Friendly", "Homestyle", "Light & Easy"],
    recipeId: "vegetable-khichdi",
    topBarColor: "from-secondary to-secondary-fixed",
    slotBadgeBg: "bg-secondary-container/50 text-secondary",
    isNonVeg: false,
    swapped: false,
  },
];

const NON_VEG_MEALS = [
  {
    id: "breakfast",
    slot: "Breakfast • 8:30 AM",
    calories: "360 kcal",
    cookTime: "15 Mins Cook",
    title: "Spicy Street-Style Egg Bhurji with Butter Pav",
    desc: "Farm eggs scrambled with caramelized onions, green chillies, tomatoes and fresh coriander, served with toasted butter pav.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    tags: ["Non-Veg", "High Protein", "Quick Breakfast"],
    recipeId: "kolkata-egg-curry",
    topBarColor: "from-amber-600 to-amber-700",
    slotBadgeBg: "bg-amber-100 text-amber-900",
    isNonVeg: true,
    swapped: false,
  },
  {
    id: "lunch",
    slot: "Lunch • 1:30 PM",
    calories: "620 kcal",
    cookTime: "50 Mins Cook",
    title: "Hyderabadi Chicken Dum Biryani with Onion Raita",
    desc: "Long grain aged basmati rice layered with tender saffron-marinated bone-in chicken, brown onions, and aromatic potli garam masala.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    tags: ["Non-Veg", "Hyderabadi", "Dum Pukht"],
    recipeId: "hyderabadi-chicken-dum-biryani",
    topBarColor: "from-red-600 to-red-700",
    slotBadgeBg: "bg-red-100 text-red-900",
    isNonVeg: true,
    swapped: false,
  },
  {
    id: "dinner",
    slot: "Dinner • 8:00 PM",
    calories: "410 kcal",
    cookTime: "35 Mins Cook",
    title: "Chettinad Pepper Chicken with Soft Whole Wheat Phulkas",
    desc: "Tender chicken morsels roasted with freshly crushed black peppercorns, roasted coconut paste, curry leaves and fennel.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    tags: ["Non-Veg", "Chettinad", "Spicy & Robust"],
    recipeId: "chettinad-pepper-chicken",
    topBarColor: "from-orange-600 to-red-600",
    slotBadgeBg: "bg-red-50 text-red-800",
    isNonVeg: true,
    swapped: false,
  },
];

export default function HomeDashboard() {
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(" ")[0] || "Chef";
  const [prepDone, setPrepDone] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isUserDietNonVeg =
    profile?.dietary_preference?.toLowerCase().includes("non") ||
    profile?.dietary_preference?.toLowerCase().includes("omnivore");

  const [dietMode, setDietMode] = useState<"veg" | "non-veg">("veg");
  const [meals, setMeals] = useState(VEG_MEALS);
  const [todayDateStr, setTodayDateStr] = useState<string>("");

  useEffect(() => {
    setTodayDateStr(getTodayBannerDisplay());
  }, []);

  // Sync initial diet mode when profile loads
  useEffect(() => {
    if (isUserDietNonVeg) {
      setDietMode("non-veg");
      setMeals(NON_VEG_MEALS);
    } else {
      setDietMode("veg");
      setMeals(VEG_MEALS);
    }
  }, [isUserDietNonVeg]);

  const toggleDietMode = (mode: "veg" | "non-veg") => {
    setDietMode(mode);
    setMeals(mode === "non-veg" ? NON_VEG_MEALS : VEG_MEALS);
    showToast(
      mode === "non-veg"
        ? "Switched to delicious Non-Veg meal recommendations!"
        : "Switched to Pure Vegetarian meal recommendations!"
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSwapDish = (id: string) => {
    setMeals((prev) =>
      prev.map((meal) => {
        if (meal.id === id) {
          if (!meal.swapped) {
            if (dietMode === "non-veg") {
              return {
                ...meal,
                title:
                  meal.id === "breakfast"
                    ? "Masala Egg Omelette with Whole Wheat Toast"
                    : meal.id === "lunch"
                    ? "Andhra Kodi Kura (Spicy Chicken Curry) & Steamed Rice"
                    : "Punjabi Butter Chicken (Murgh Makhani) with Garlic Naan",
                desc:
                  meal.id === "breakfast"
                    ? "Fluffy double-egg omelette whisked with onions, green chillies, tomatoes and fresh herbs."
                    : meal.id === "lunch"
                    ? "Fiery Guntur chilli spiced chicken curry slow simmered with poppy seeds and coconut."
                    : "Tender tandoori chicken simmered in rich makhani gravy with butter, cream and kasuri methi.",
                recipeId:
                  meal.id === "breakfast"
                    ? "kolkata-egg-curry"
                    : meal.id === "lunch"
                    ? "andhra-chicken-curry"
                    : "punjabi-butter-chicken",
                swapped: true,
              };
            } else {
              return {
                ...meal,
                title:
                  meal.id === "breakfast"
                    ? "Crispy Medu Vada with Drumstick Sambar"
                    : meal.id === "lunch"
                    ? "Amritsari Rajma Masala & Steamed Jeera Rice"
                    : "Palak Paneer with Soft Whole Wheat Phulkas",
                desc:
                  meal.id === "breakfast"
                    ? "Golden fried spiced urad dal fritters with fresh mint coconut chutney."
                    : meal.id === "lunch"
                    ? "Slow simmered kidney beans in rich spiced tomato bhuna gravy."
                    : "Iron-rich spinach puree with melt-in-mouth cottage cheese cubes.",
                recipeId:
                  meal.id === "breakfast"
                    ? "crispy-medu-vada"
                    : meal.id === "lunch"
                    ? "amritsari-rajma-chawal"
                    : "paneer-butter-masala",
                swapped: true,
              };
            }
          } else {
            const originalSet = dietMode === "non-veg" ? NON_VEG_MEALS : VEG_MEALS;
            const original = originalSet.find((m) => m.id === id);
            return original ? { ...original, swapped: false } : meal;
          }
        }
        return meal;
      })
    );
    showToast(`Dish swapped with ${firstName}'s seasonal alternative!`);
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

      <div className="relative w-full max-w-[1320px] mx-auto px-gutter py-space-md sm:py-space-lg flex flex-col gap-space-xl">
        {/* Subtle decorative ambient background glows */}
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-16 w-72 h-72 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>

        {/* Hero / Greeting Header Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-container-lowest via-surface-container-low to-surface-container p-space-md sm:p-space-xl shadow-[0_4px_24px_-2px_rgba(44,34,30,0.04)] border border-outline-variant/30">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-lg">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <div className="inline-flex items-center gap-space-xs self-start bg-surface-container-high text-on-surface-variant px-space-md py-1 rounded-full font-label-sm text-label-sm shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span>{todayDateStr || "Today • Fresh Daily Menu"}</span>
                <span className="mx-1 text-outline/40">|</span>
                <span className="text-primary font-medium">Satvik &amp; Wholesome</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg sm:text-display-lg text-on-surface tracking-tight mt-space-xs">
                Namaste, {firstName}!{" "}
                <span className="inline-block transform hover:rotate-12 transition-transform cursor-default">
                  🙏
                </span>{" "}
                <span className="italic font-normal text-primary">Good morning</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                What shall we cook for the family today? Here is your balanced,
                delicious homestyle plan with tender spices and wholesome nutrition.
              </p>
            </div>

            {/* Action Quick-Bar */}
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs lg:pt-0">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="group inline-flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary px-space-lg py-space-sm rounded-full font-label-md text-label-md shadow-[0_4px_16px_rgba(159,60,22,0.25)] hover:shadow-[0_6px_20px_rgba(159,60,22,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-12">
                  auto_awesome
                </span>
                <span>Auto-Plan Today's Meals</span>
              </button>
              <button
                onClick={() => handleSwapDish("lunch")}
                className="inline-flex items-center gap-space-xs bg-surface-container-lowest hover:bg-surface-container-high text-on-surface px-space-md py-space-sm rounded-full font-label-md text-label-md shadow-[0_2px_8px_rgba(44,34,30,0.05)] transition-all border border-outline-variant/30"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  sync_alt
                </span>
                <span>Swap a Dish</span>
              </button>
              <Link
                href="/grocery-list"
                className="inline-flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container-high text-on-surface px-space-md py-space-sm rounded-full font-label-md text-label-md transition-colors border border-outline-variant/30"
              >
                <div className="relative flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    local_mall
                  </span>
                  <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    12
                  </span>
                </div>
                <span>Grocery List</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Prep Reminder / Kitchen Tip Alert Banner */}
        <section className="rounded-xl bg-secondary-container/40 p-space-md sm:p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-[0_2px_12px_rgba(55,104,71,0.06)] border border-secondary-container relative overflow-hidden">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-secondary shadow-inner">
              <span className="material-symbols-outlined text-[26px]">
                notifications_active
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
                {firstName}&apos;s Kitchen Note • Tonight&apos;s Prep
              </span>
              <p className="font-title-md text-title-md text-on-surface mt-0.5">
                {dietMode === "non-veg"
                  ? "Marinate 500g Chicken tonight in hung curd, ginger-garlic paste and fresh spices for tomorrow's aromatic Dum Biryani!"
                  : "Soak 1 cup Rajma (kidney beans) tonight in warm water for tomorrow's hearty Punjabi lunch!"}
              </p>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {dietMode === "non-veg"
                  ? "Takes just 5 minutes • Yields tender, deeply flavorful chicken with fragrant aroma"
                  : "Takes just 2 minutes • Ensures easy boiling in morning pressure cooker"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm self-end md:self-center shrink-0">
            <button
              onClick={() => {
                setPrepDone(!prepDone);
                showToast(
                  !prepDone
                    ? `Marked tonight's prep as done! Great job, ${firstName}.`
                    : "Reset prep reminder status."
                );
              }}
              className={`flex items-center gap-space-xs cursor-pointer select-none px-space-md py-space-sm rounded-full shadow-sm transition-all border ${
                prepDone
                  ? "bg-secondary-container text-secondary font-bold border-secondary/30"
                  : "bg-surface-container-lowest hover:bg-surface-container-high text-on-surface border-outline-variant/30"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                  prepDone ? "bg-secondary text-on-secondary" : "bg-surface-container-high"
                }`}
              >
                {prepDone && (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
              </div>
              <span className="font-label-md text-label-md">
                {prepDone ? "Done for Tonight!" : "Mark as Done"}
              </span>
            </button>
          </div>
        </section>

        {/* Main Today's Meals Spotlight Section */}
        <section className="flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
                  Daily Gastronomy Matrix
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-1">
                Today's Meal Spotlight
              </h2>
            </div>

            {/* Diet View Filter Switcher */}
            <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/30 shadow-xs">
              <button
                type="button"
                onClick={() => toggleDietMode("veg")}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  dietMode === "veg"
                    ? "bg-white text-emerald-800 shadow-sm border border-emerald-300 ring-2 ring-emerald-500/20"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="w-3 h-3 rounded-[3px] border-2 border-emerald-600 flex items-center justify-center p-[1px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                </span>
                <span className="material-symbols-outlined text-[14px] text-emerald-600 font-black">check</span>
                <span>Pure Veg</span>
              </button>

              <button
                type="button"
                onClick={() => toggleDietMode("non-veg")}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  dietMode === "non-veg"
                    ? "bg-white text-red-800 shadow-sm border border-red-300 ring-2 ring-red-500/20"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="w-3 h-3 rounded-[3px] border-2 border-red-600 flex items-center justify-center p-[1px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                </span>
                <span className="material-symbols-outlined text-[14px] text-red-600 font-black">check</span>
                <span>Non-Veg Meals</span>
              </button>
            </div>
          </div>

          {/* 3 prominent interactive cards side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {meals.map((meal) => (
              <article
                key={meal.id}
                className="group relative rounded-xl bg-surface-container-lowest p-space-md sm:p-space-lg shadow-[0_4px_20px_-2px_rgba(44,34,30,0.05)] hover:shadow-[0_12px_32px_-4px_rgba(44,34,30,0.1)] transition-all duration-300 flex flex-col justify-between overflow-hidden border border-outline-variant/25"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${meal.topBarColor}`}
                ></div>
                <div className="flex flex-col gap-space-md">
                  {/* Meal Timing & Badge Header */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-md text-label-md ${meal.slotBadgeBg}`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {meal.id === "breakfast"
                            ? "wb_twilight"
                            : meal.id === "lunch"
                            ? "sunny"
                            : "nights_stay"}
                        </span>
                        <span>{meal.slot}</span>
                      </span>
                      <DietaryBadge
                        isNonVeg={meal.isNonVeg}
                        tags={meal.tags}
                        title={meal.title}
                        size="sm"
                      />
                    </div>
                    <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">
                        local_fire_department
                      </span>
                      {meal.calories}
                    </span>
                  </div>

                  {/* Dish Image with Hover Zoom */}
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container shadow-inner">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={meal.image}
                      alt={meal.title}
                    />
                    <div className="absolute bottom-2 left-2 bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded-md flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                        timer
                      </span>
                      <span>{meal.cookTime}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-title-lg text-title-lg text-on-surface leading-snug group-hover:text-primary transition-colors">
                      {meal.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {meal.desc}
                    </p>
                  </div>

                  {/* Dietary & Regional Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {meal.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${
                          idx === 0
                            ? "bg-secondary-container/60 text-on-secondary-container font-semibold"
                            : idx === 1
                            ? "bg-surface-container-high text-on-surface-variant"
                            : "bg-tertiary-fixed/40 text-on-tertiary-fixed"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-space-md mt-space-md flex items-center gap-space-xs border-t border-surface-container-high/40">
                  <Link
                    href={`/recipes/${meal.recipeId}`}
                    className="flex-1 py-space-xs px-space-sm bg-primary/10 hover:bg-primary text-primary hover:text-on-primary rounded-lg font-label-md text-label-md transition-all text-center flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      menu_book
                    </span>
                    <span>View Recipe</span>
                  </Link>
                  <button
                    onClick={() => handleSwapDish(meal.id)}
                    aria-label="Swap Dish"
                    title="Swap with seasonal alternative"
                    className="p-space-xs bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface rounded-lg transition-colors flex items-center justify-center border border-outline-variant/30"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      swap_horiz
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Nutrition & Tomorrow Sneak Peek Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Column: Tomorrow's Sneak Peek (7 cols) */}
          <section className="lg:col-span-7 flex flex-col gap-space-md bg-surface-container-low p-space-md sm:p-space-lg rounded-xl shadow-[0_2px_12px_rgba(44,34,30,0.03)] border border-outline-variant/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  calendar_month
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Tomorrow's Meal Sneak-Peek
                </h3>
              </div>
              <div className="flex items-center gap-space-xs self-start sm:self-auto">
                <button
                  onClick={() => showToast("Shuffled tomorrow's lunch options!")}
                  className="px-space-md py-1 rounded-full bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm shadow-sm transition-all flex items-center gap-1 border border-outline-variant/30"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    shuffle
                  </span>
                  <span>Shuffle</span>
                </button>
                <button
                  onClick={() => showToast("Friday meal plan approved! Added to shopping list.")}
                  className="px-space-md py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm shadow-sm transition-all flex items-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  <span>Approve Plan</span>
                </button>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant -mt-1">
              Friday, 25 October • Thoughtfully aligned with your soaked rajma reminder!
            </p>

            {/* Sneak peek mini cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
              {/* Tomorrow: Breakfast */}
              <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-space-sm border border-outline-variant/20">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      Breakfast
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-label-sm">
                      290 kcal
                    </span>
                  </div>
                  <h4 className="font-title-md text-title-md text-on-surface leading-tight">
                    Methi Paratha with White Butter
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] line-clamp-1">
                    Fresh fenugreek spiced flatbread
                  </p>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant text-label-sm font-label-sm pt-1 border-t border-surface-container-high/30">
                  <span className="inline-flex items-center gap-0.5 text-secondary">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>{" "}
                    Quick 20m
                  </span>
                  <Link href="/weekly-planner">
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-primary">
                      edit
                    </span>
                  </Link>
                </div>
              </div>

              {/* Tomorrow: Lunch */}
              <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-space-sm border border-outline-variant/20">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-tertiary font-bold">
                      Lunch
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-label-sm">
                      580 kcal
                    </span>
                  </div>
                  <h4 className="font-title-md text-title-md text-on-surface leading-tight">
                    Amritsari Rajma Masala &amp; Chawal
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] line-clamp-1">
                    Slow-simmered kidney beans &amp; jeera rice
                  </p>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant text-label-sm font-label-sm pt-1 border-t border-surface-container-high/30">
                  <span className="inline-flex items-center gap-0.5 text-tertiary">
                    <span className="material-symbols-outlined text-[14px]">star</span>{" "}
                    Family Fav
                  </span>
                  <Link href="/weekly-planner">
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-primary">
                      edit
                    </span>
                  </Link>
                </div>
              </div>

              {/* Tomorrow: Dinner */}
              <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-space-sm border border-outline-variant/20">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary font-bold">
                      Dinner
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-label-sm">
                      410 kcal
                    </span>
                  </div>
                  <h4 className="font-title-md text-title-md text-on-surface leading-tight">
                    Crispy Masala Dosa &amp; Tomato Chutney
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] line-clamp-1">
                    Spiced potato stuffing &amp; tangy dip
                  </p>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant text-label-sm font-label-sm pt-1 border-t border-surface-container-high/30">
                  <span className="inline-flex items-center gap-0.5 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">alarm</span>{" "}
                    30m
                  </span>
                  <Link href="/weekly-planner">
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-primary">
                      edit
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Family Nutrition & Variety Meter (5 cols) */}
          <section className="lg:col-span-5 flex flex-col gap-space-md bg-surface-container-lowest p-space-md sm:p-space-lg rounded-xl shadow-[0_4px_20px_-2px_rgba(44,34,30,0.05)] border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  health_and_safety
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Family Nutrition Balance
                </h3>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-bold bg-secondary-container/50 px-2.5 py-0.5 rounded-full">
                Optimal Today
              </span>
            </div>

            {/* Micro-stats Widget */}
            <div className="grid grid-cols-3 gap-space-xs text-center">
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col items-center">
                <span className="font-headline-md text-headline-md text-primary font-bold">
                  5/5
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Food Groups
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col items-center">
                <span className="font-headline-md text-headline-md text-secondary font-bold">
                  100%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Pure Veg
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col items-center">
                <span className="font-headline-md text-headline-md text-tertiary font-bold">
                  0g
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Waste Logged
                </span>
              </div>
            </div>

            {/* Macro Balance Bar */}
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface">
                <span>Macro Balance (P: 18% • C: 54% • F: 28%)</span>
                <span className="font-semibold text-primary">1,240 / 1,400 kcal</span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-container-high overflow-hidden flex">
                <div
                  className="bg-secondary h-full"
                  style={{ width: "25%" }}
                  title="Proteins: 25%"
                ></div>
                <div
                  className="bg-primary h-full"
                  style={{ width: "50%" }}
                  title="Complex Carbs: 50%"
                ></div>
                <div
                  className="bg-tertiary-fixed-dim h-full"
                  style={{ width: "25%" }}
                  title="Good Fats & Ghee: 25%"
                ></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant px-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> Protein
                  (Dal/Curd)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Grains
                  (Roti/Khichdi)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>{" "}
                  Good Fats (Ghee)
                </span>
              </div>
            </div>

            {/* Variety Gauge Micro-indicator */}
            <div className="bg-surface-container-low/70 p-space-sm rounded-lg flex items-center gap-space-sm mt-space-xs">
              <div className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm text-primary">
                <span className="material-symbols-outlined text-[20px]">
                  thumb_up
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface text-[13px] leading-tight">
                  {firstName}&apos;s Variety Score: 94/100
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  3 distinct color vegetables (Spinach, Tomato, Pumpkin) included across meals.
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <AiMealGenModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </main>
  );
}
