"use client";

import { useAuth } from "@/context/AuthContext";

import React, { useState } from "react";

interface Member {
  name: string;
  role: string;
  age: string;
  notes: string;
  tags: string[];
  spice: string;
  icon: string;
  image: string;
  badgeBg: string;
  borderColor: string;
}

export default function FamilyPreferencesPage() {
  const { profile, user } = useAuth();
  const firstName =
    profile?.full_name?.split(" ")[0] ||
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Chef";
  const [householdDiet, setHouseholdDiet] = useState("pure-veg");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fasting checks
  const [vratRules, setVratRules] = useState({
    ekadashi: true,
    tueSatVeg: true,
    jainRoots: true,
    navratri: false,
  });

  // Blocklisted items
  const [blocklist, setBlocklist] = useState<Array<{ name: string; isAllergy?: boolean }>>([
    { name: "Karela (Bitter Gourd)" },
    { name: "Raw Capsicum / Shimla Mirch" },
    { name: "Mushrooms" },
    { name: "Peanuts (Severe Allergy)", isAllergy: true },
  ]);
  const [newDislike, setNewDislike] = useState("");

  // Cuisine sliders
  const [cuisineBalance, setCuisineBalance] = useState({
    south: 50,
    north: 30,
    west: 10,
    fusion: 10,
  });

  // Members list
  const [members, setMembers] = useState<Member[]>([
    {
      name: `${firstName}`,
      role: "Head Chef",
      age: "48 yrs",
      notes: "Balanced homestyle, loves rasam, kootu, and piping hot South Indian morning tiffins.",
      tags: ["Authentic Rasam", "Less Oil"],
      spice: "Standard Spice",
      icon: "skillet",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      badgeBg: "bg-secondary text-on-secondary",
      borderColor: "bg-primary",
    },
    {
      name: "Appa (Ramesh)",
      role: "Low Salt • Diabetic Care",
      age: "52 yrs",
      notes: "Soft hot phulkas, baked bitter gourd poriyal, low sodium dal, and minimal tempering oil.",
      tags: ["Low GI Grains", "Low Sodium"],
      spice: "Mild Herbaceous",
      icon: "favorite",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      badgeBg: "bg-primary-container text-on-primary-container",
      borderColor: "bg-secondary",
    },
    {
      name: "Rohan",
      role: "School Kid • Paneer Fan",
      age: "12 yrs",
      notes: "Mild spice only. Obsessed with Paneer tikka wraps, tiffin toasties, cheesy dosas, and aloo parathas.",
      tags: ["Paneer Fan", "Tiffin Box Prep"],
      spice: "Zero Chili",
      icon: "school",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
      badgeBg: "bg-tertiary text-on-tertiary",
      borderColor: "bg-tertiary-fixed-dim",
    },
    {
      name: "Dadi",
      role: "Grandmother • Sattvic Diet",
      age: "72 yrs",
      notes: "Sattvic / Jain meals on Tue & Thu. Soft steamed rice, easy-digest khichdi, no raw onions or heavy masalas.",
      tags: ["Tue/Thu Vrat", "Soft Texture"],
      spice: "Digestive Herbs",
      icon: "spa",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80",
      badgeBg: "bg-secondary-fixed-dim text-on-secondary-fixed",
      borderColor: "bg-outline",
    },
  ]);

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [newMemberNotes, setNewMemberNotes] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const removeChip = (index: number) => {
    setBlocklist((prev) => prev.filter((_, i) => i !== index));
    showToast("Removed ingredient from restriction blocklist.");
  };

  const addDislike = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDislike.trim()) {
      setBlocklist((prev) => [...prev, { name: newDislike.trim() }]);
      setNewDislike("");
      showToast(`Added ${newDislike.trim()} to restricted ingredients.`);
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemberName.trim()) {
      const created: Member = {
        name: newMemberName.trim(),
        role: newMemberRole.trim() || "Family Member",
        age: "Family",
        notes: newMemberNotes.trim() || "Enjoys warm homestyle meals.",
        tags: ["Custom Profile"],
        spice: "Mild Spice",
        icon: "person",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        badgeBg: "bg-secondary text-on-secondary",
        borderColor: "bg-primary",
      };
      setMembers((prev) => [...prev, created]);
      setNewMemberName("");
      setNewMemberRole("");
      setNewMemberNotes("");
      setIsAddMemberOpen(false);
      showToast(`Added ${created.name} to household profiles!`);
    }
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

      {/* Page Header & Warm Intro */}
      <div className="relative w-full overflow-hidden bg-surface-container-low pb-space-xl pt-space-lg shadow-sm border-b border-surface-container-high/40">
        <div className="max-w-[1320px] mx-auto px-gutter">
          {/* Top Eyebrow & Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px]">
                family_restroom
              </span>
              <span className="uppercase tracking-wider font-bold">
                Household Profiles • Kitchen Almanac
              </span>
            </div>
            <div className="flex items-center gap-space-xs bg-secondary-container/60 text-on-secondary-container px-space-md py-1 rounded-full text-label-sm font-label-sm shadow-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>
                {members.length} Profiles Synchronized with AI Meal Planner
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
            <div className="lg:col-span-8 flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Family Taste &amp; Dietary Preferences
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Help us tailor meal plans that everyone in the house loves, from
                fussy toddlers to health-conscious grandparents. Every spice level,
                fasting day, and portion size stays in harmony.
              </p>
            </div>

            {/* Kitchen Harmony Meter Visual */}
            <div className="lg:col-span-4 flex items-center justify-end">
              <div className="w-full sm:w-auto bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-outline-variant/30">
                <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-high"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    ></path>
                    <path
                      className="text-primary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="94, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    ></path>
                  </svg>
                  <span className="absolute font-title-md text-title-md text-primary font-bold">
                    94%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface leading-snug">
                    Kitchen Harmony
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Zero conflicting dinner clashes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1320px] mx-auto px-gutter py-space-xl flex flex-col gap-space-xl">
        {/* Section 1: Family Members Profile Setup */}
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Family Members
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Tailor portion sizes, special health guidelines, and signature
                favorites per family member.
              </p>
            </div>
            <button
              onClick={() => setIsAddMemberOpen(true)}
              className="inline-flex items-center gap-space-xs bg-surface-container text-primary hover:bg-primary hover:text-on-primary px-space-md py-space-sm rounded-full font-label-md text-label-md transition-all shadow-sm border border-outline-variant/30"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>+ Add Family Member</span>
            </button>
          </div>

          {/* Member Add Form Modal */}
          {isAddMemberOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
              <form
                onSubmit={handleAddMember}
                className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl p-6 flex flex-col gap-4 border border-outline-variant/40"
              >
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
                  <h3 className="font-title-lg text-title-lg text-on-surface">
                    Add Family Member
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAddMemberOpen(false)}
                    className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant block mb-1">
                    Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya (Daughter)"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full px-4 py-2 bg-surface-container-low rounded-lg border border-outline-variant/40 text-on-surface font-body-md outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant block mb-1">
                    Dietary Focus / Role:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. High Protein • College Student"
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    className="w-full px-4 py-2 bg-surface-container-low rounded-lg border border-outline-variant/40 text-on-surface font-body-md outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant block mb-1">
                    Taste Notes &amp; Preferences:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Loves spicy Chettinad curries, likes oats for breakfast..."
                    value={newMemberNotes}
                    onChange={(e) => setNewMemberNotes(e.target.value)}
                    className="w-full px-4 py-2 bg-surface-container-low rounded-lg border border-outline-variant/40 text-on-surface font-body-md outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddMemberOpen(false)}
                    className="px-4 py-2 rounded-lg font-label-md text-label-md bg-surface-container text-on-surface hover:bg-surface-container-high"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container shadow-sm"
                  >
                    Save Member
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Member Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {members.map((member, i) => (
              <div
                key={i}
                className="group bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden border border-outline-variant/25"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${member.borderColor}`}
                ></div>
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-start justify-between gap-space-xs pt-1">
                    <div className="relative">
                      <img
                        className="w-14 h-14 rounded-full object-cover shadow-sm"
                        src={member.image}
                        alt={member.name}
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${member.badgeBg}`}
                        title={member.role}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {member.icon}
                        </span>
                      </span>
                    </div>
                    <button
                      aria-label="Edit Profile"
                      onClick={() => showToast(`Editing profile for ${member.name}`)}
                      className="text-on-surface-variant hover:text-primary transition-colors p-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        edit
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-title-lg text-title-lg text-on-surface">
                      {member.name}
                    </h3>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      {member.role} • {member.age}
                    </span>
                  </div>
                  <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1 border border-outline-variant/20">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                      Taste Notes
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface">
                      {member.notes}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {member.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-space-md mt-space-md flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-surface-container-high/30">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      check_circle
                    </span>{" "}
                    Active Planner
                  </span>
                  <span className="font-semibold text-primary">{member.spice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 & 3: Bento Grid: Dietary/Religious + Regional Favorites */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Column Left: Household Dietary & Religious Fasting Rules (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    restaurant
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Household Diet Type
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/50 px-space-sm py-0.5 rounded-full font-semibold">
                  Primary Kitchen Foundation
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Sets the baseline cookware, pantry stocking, and weekly recipe
                generation algorithms.
              </p>

              {/* Diet Pill Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs pt-1">
                {[
                  { id: "pure-veg", label: "Pure Veg", sub: "100% Meatless", icon: "eco" },
                  { id: "veg-egg", label: "Veg + Egg", sub: "Eggetarian", icon: "egg_alt" },
                  { id: "non-veg", label: "Non-Veg", sub: "Mixed Table", icon: "set_meal" },
                  { id: "vegan", label: "Vegan", sub: "Zero Dairy", icon: "nutrition" },
                ].map((diet) => (
                  <button
                    key={diet.id}
                    onClick={() => {
                      setHouseholdDiet(diet.id);
                      showToast(`Updated household diet baseline to ${diet.label}`);
                    }}
                    className={`p-space-sm rounded-lg flex flex-col items-center justify-center gap-1 text-center transition-all ${
                      householdDiet === diet.id
                        ? "bg-primary text-on-primary shadow-sm"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-outline-variant/20"
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {diet.icon}
                    </span>
                    <span className="font-title-md text-title-md leading-none">
                      {diet.label}
                    </span>
                    <span className="font-label-sm text-label-sm opacity-90">
                      {diet.sub}
                    </span>
                  </button>
                ))}
              </div>

              {/* Religious / Fasting Rules Section */}
              <div className="pt-space-md flex flex-col gap-space-sm border-t border-surface-container-high/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-tertiary text-[20px]">
                      calendar_month
                    </span>
                    <h4 className="font-title-md text-title-md text-on-surface">
                      Vrat &amp; Religious Observances
                    </h4>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                    Auto-adapts weekly menu
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  {/* Checkbox Item 1 */}
                  <label className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20">
                    <input
                      checked={vratRules.ekadashi}
                      onChange={(e) =>
                        setVratRules({ ...vratRules, ekadashi: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                      type="checkbox"
                    />
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        Ekadashi Vrat
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Substitutes grains with Sabudana, Samak rice, and fruits twice a month.
                      </span>
                    </div>
                  </label>

                  {/* Checkbox Item 2 */}
                  <label className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20">
                    <input
                      checked={vratRules.tueSatVeg}
                      onChange={(e) =>
                        setVratRules({ ...vratRules, tueSatVeg: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                      type="checkbox"
                    />
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        Tuesday &amp; Saturday Pure Veg
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        No onions, garlic or outside takeout permitted on sacred weekdays.
                      </span>
                    </div>
                  </label>

                  {/* Checkbox Item 3 */}
                  <label className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20">
                    <input
                      checked={vratRules.jainRoots}
                      onChange={(e) =>
                        setVratRules({ ...vratRules, jainRoots: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                      type="checkbox"
                    />
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        Jain / No Root Vegetables
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Applies strictly to Dadi's portions on selected fasting days.
                      </span>
                    </div>
                  </label>

                  {/* Checkbox Item 4 */}
                  <label className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20">
                    <input
                      checked={vratRules.navratri}
                      onChange={(e) =>
                        setVratRules({ ...vratRules, navratri: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                      type="checkbox"
                    />
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        Navratri Fasting Rules
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Kuttu flour, sendha namak, and ghee-only preparation.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Disliked Ingredients & Allergy Blocklist */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-error text-[22px]">
                    block
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Ingredient Blocklist &amp; Allergies
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm bg-error-container/40 text-on-error-container px-space-sm py-0.5 rounded-full font-semibold">
                  Strict AI Filter
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                The planner will never suggest meals or generate grocery checklist
                items with these ingredients.
              </p>

              {/* Interactive Chips */}
              <div className="flex flex-wrap gap-space-xs items-center">
                {blocklist.map((chip, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-space-md py-1.5 rounded-full font-label-md text-label-md shadow-sm border ${
                      chip.isAllergy
                        ? "bg-error-container/60 text-on-error-container font-bold border-error/30"
                        : "bg-surface-container-high text-on-surface border-outline-variant/20"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[14px] ${
                        chip.isAllergy ? "text-error" : "text-error/70"
                      }`}
                    >
                      {chip.isAllergy ? "warning" : "cancel"}
                    </span>
                    <span>{chip.name}</span>
                    <button
                      onClick={() => removeChip(idx)}
                      aria-label={`Remove ${chip.name}`}
                      className="ml-1 text-on-surface-variant hover:text-error transition-colors font-bold text-base"
                      type="button"
                    >
                      ×
                    </button>
                  </span>
                ))}

                {/* Quick Add Dislike Input Trigger */}
                <form onSubmit={addDislike} className="relative flex items-center">
                  <input
                    className="bg-surface-container-low text-on-surface placeholder:text-on-surface-variant px-space-md py-1.5 rounded-full text-label-md font-label-md outline-none focus:bg-surface-container-highest transition-all w-48 border border-outline-variant/30"
                    placeholder="+ Add dislike / allergy"
                    type="text"
                    value={newDislike}
                    onChange={(e) => setNewDislike(e.target.value)}
                  />
                  <button
                    className="absolute right-2 text-primary hover:text-primary-container p-0.5"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      add_circle
                    </span>
                  </button>
                </form>
              </div>

              <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm pt-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  info
                </span>
                <span>
                  Allergic ingredients trigger full warning overlays on any imported
                  heritage recipes.
                </span>
              </div>
            </div>
          </div>

          {/* Column Right: Regional Cuisine Favoritism & Rhythm (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            {/* Regional Cuisine Distribution Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">
                    pie_chart
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Regional Cuisine Balance
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm font-semibold text-primary">
                  100% Target
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Defines how we proportion meals across distinct Indian heritage
                traditions over a 7-day cycle.
              </p>

              {/* Visual Stacked Progress Bar */}
              <div className="flex flex-col gap-space-xs">
                <div className="w-full h-4 rounded-full overflow-hidden flex bg-surface-container shadow-inner">
                  <div
                    className="bg-primary hover:opacity-90 transition-all cursor-pointer"
                    style={{ width: `${cuisineBalance.south}%` }}
                    title={`South Indian: ${cuisineBalance.south}%`}
                  ></div>
                  <div
                    className="bg-tertiary-container hover:opacity-90 transition-all cursor-pointer"
                    style={{ width: `${cuisineBalance.north}%` }}
                    title={`North Indian: ${cuisineBalance.north}%`}
                  ></div>
                  <div
                    className="bg-secondary hover:opacity-90 transition-all cursor-pointer"
                    style={{ width: `${cuisineBalance.west}%` }}
                    title={`Gujarati/West: ${cuisineBalance.west}%`}
                  ></div>
                  <div
                    className="bg-tertiary-fixed-dim hover:opacity-90 transition-all cursor-pointer"
                    style={{ width: `${cuisineBalance.fusion}%` }}
                    title={`Street Food: ${cuisineBalance.fusion}%`}
                  ></div>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant px-1 font-semibold">
                  <span>South ({cuisineBalance.south}%)</span>
                  <span>North ({cuisineBalance.north}%)</span>
                  <span>West ({cuisineBalance.west}%)</span>
                  <span>Fusion ({cuisineBalance.fusion}%)</span>
                </div>
              </div>

              {/* Weighted Sliders */}
              <div className="flex flex-col gap-space-md pt-space-xs">
                {/* South Indian */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-title-md text-title-md">
                    <span className="flex items-center gap-1.5 text-on-surface">
                      <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
                      South Indian (Tamil • Telugu • Kerala)
                    </span>
                    <span className="font-bold text-primary font-label-md text-label-md">
                      {cuisineBalance.south}%
                    </span>
                  </div>
                  <input
                    className="w-full accent-primary cursor-pointer"
                    max="100"
                    min="0"
                    type="range"
                    value={cuisineBalance.south}
                    onChange={(e) =>
                      setCuisineBalance({
                        ...cuisineBalance,
                        south: Number(e.target.value),
                      })
                    }
                  />
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Sambar, Curd Rice, Idli-Vada, Avial, Lemon Rice
                  </span>
                </div>

                {/* North Indian */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-title-md text-title-md">
                    <span className="flex items-center gap-1.5 text-on-surface">
                      <span className="w-3 h-3 rounded-full bg-tertiary-container inline-block"></span>
                      North Indian (Punjabi • Awadhi)
                    </span>
                    <span className="font-bold text-tertiary font-label-md text-label-md">
                      {cuisineBalance.north}%
                    </span>
                  </div>
                  <input
                    className="w-full accent-tertiary cursor-pointer"
                    max="100"
                    min="0"
                    type="range"
                    value={cuisineBalance.north}
                    onChange={(e) =>
                      setCuisineBalance({
                        ...cuisineBalance,
                        north: Number(e.target.value),
                      })
                    }
                  />
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Dal Tadka, Phulkas, Paneer Bhurji, Chole, Parathas
                  </span>
                </div>

                {/* Gujarati / Rajasthani */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-title-md text-title-md">
                    <span className="flex items-center gap-1.5 text-on-surface">
                      <span className="w-3 h-3 rounded-full bg-secondary inline-block"></span>
                      Gujarati • Rajasthani • Maharashtrian
                    </span>
                    <span className="font-bold text-secondary font-label-md text-label-md">
                      {cuisineBalance.west}%
                    </span>
                  </div>
                  <input
                    className="w-full accent-secondary cursor-pointer"
                    max="100"
                    min="0"
                    type="range"
                    value={cuisineBalance.west}
                    onChange={(e) =>
                      setCuisineBalance({
                        ...cuisineBalance,
                        west: Number(e.target.value),
                      })
                    }
                  />
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Sweet-sour Dal, Thepla, Kadi Khichdi, Poha
                  </span>
                </div>

                {/* Street Food & Fusion */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-title-md text-title-md">
                    <span className="flex items-center gap-1.5 text-on-surface">
                      <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim inline-block"></span>
                      Street Food &amp; Continental Fusion
                    </span>
                    <span className="font-bold text-on-surface font-label-md text-label-md">
                      {cuisineBalance.fusion}%
                    </span>
                  </div>
                  <input
                    className="w-full accent-tertiary-fixed-dim cursor-pointer"
                    max="100"
                    min="0"
                    type="range"
                    value={cuisineBalance.fusion}
                    onChange={(e) =>
                      setCuisineBalance({
                        ...cuisineBalance,
                        fusion: Number(e.target.value),
                      })
                    }
                  />
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Pav Bhaji, Mumbai Sandwiches, Pasta with desi twist
                  </span>
                </div>
              </div>
            </div>

            {/* Cooking Rhythm & Timing */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  timer
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Cooking Rhythm &amp; Timing
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Respect domestic routines so meal plans align with school buses and
                evening digestion.
              </p>
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-outline-variant/20">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      bolt
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        Breakfast Prep Limit
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        School morning hurry hours
                      </span>
                    </div>
                  </div>
                  <span className="bg-surface-container-highest px-space-md py-1 rounded-full font-label-md text-label-md text-primary font-bold">
                    20 mins max
                  </span>
                </div>

                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-outline-variant/20">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      bedtime
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        Dinner Routine
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Light &amp; early digestion
                      </span>
                    </div>
                  </div>
                  <span className="bg-secondary-container/50 px-space-md py-1 rounded-full font-label-md text-label-md text-secondary font-bold">
                    Before 8:30 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
