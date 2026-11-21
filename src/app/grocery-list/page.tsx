"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_GROCERY_ITEMS, GroceryItem } from "@/data/recipes";
import { useAuth } from "@/context/AuthContext";

export default function GroceryListPage() {
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(" ")[0] || "Chef";
  const [items, setItems] = useState<GroceryItem[]>(INITIAL_GROCERY_ITEMS);
  const [showPantryNote, setShowPantryNote] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<"veggies" | "dals" | "dairy" | "spices">("veggies");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const resetAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, purchased: false })));
    showToast("Reset all purchased grocery items!");
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      const newItem: GroceryItem = {
        id: `custom-${Date.now()}`,
        name: newItemName.trim(),
        sub: "Custom pantry addition",
        quantity: newItemQty.trim() || "1 unit",
        category: newItemCategory,
        purchased: false,
      };
      setItems((prev) => [newItem, ...prev]);
      setNewItemName("");
      setNewItemQty("");
      setIsAddingItem(false);
      showToast(`Added ${newItem.name} to grocery list!`);
    }
  };

  const handleShareWhatsApp = () => {
    const pendingItems = items.filter((i) => !i.purchased);
    const text = `🛒 *${firstName}'s Bazaar Grocery List*\n\n${pendingItems
      .map((i) => `• ${i.name} (${i.quantity})`)
      .join("\n")}\n\n_Planned with love on ${firstName}'s Meal Planner_`;

    navigator.clipboard?.writeText(text);
    showToast("Copied Bazaar list to clipboard for WhatsApp!");
  };

  const totalCount = items.length;
  const purchasedCount = items.filter((i) => i.purchased).length;
  const percentage = Math.round((purchasedCount / (totalCount || 1)) * 100);

  const getCategoryItems = (cat: "veggies" | "dals" | "dairy" | "spices") =>
    items.filter((i) => i.category === cat);

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
        <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="absolute top-64 -left-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-[1320px] mx-auto px-gutter py-space-lg w-full flex flex-col gap-space-lg relative z-10">
          {/* Breadcrumb & Date Context */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="material-symbols-outlined text-[16px] text-outline">
                chevron_right
              </span>
              <Link
                href="/weekly-planner"
                className="hover:text-primary transition-colors"
              >
                Current Week Plan
              </Link>
              <span className="material-symbols-outlined text-[16px] text-outline">
                chevron_right
              </span>
              <span className="text-primary font-bold">Bazaar Grocery List</span>
            </div>
            <div className="flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full border border-outline-variant/20">
              <span className="material-symbols-outlined text-secondary text-[16px]">
                calendar_month
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                Week: Oct 20 – Oct 26 • Diwali Preparation Cycle
              </span>
            </div>
          </div>

          {/* Main Header & Action Bar Block */}
          <div className="relative bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-lg overflow-hidden border border-outline-variant/30">
            {/* Top terracotta micro-accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary-container to-secondary"></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
              <div className="flex flex-col gap-space-xs max-w-2xl">
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wide font-bold">
                    {firstName}&apos;s Smart Rasoi
                  </span>
                  <span className="text-on-surface-variant text-label-sm">•</span>
                  <span className="text-secondary font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>{" "}
                    Auto-synced 10 mins ago
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Weekly Kitchen &amp; Bazaar Grocery List
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Generated automatically from your 7-day meal plan (24 planned
                  homestyle meals &amp; snacks).
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-space-sm">
                {/* Add Custom Item */}
                <button
                  onClick={() => setIsAddingItem(!isAddingItem)}
                  className="inline-flex items-center gap-space-xs bg-surface-container text-on-surface hover:bg-surface-container-highest px-space-md py-space-sm rounded-full font-label-md text-label-md shadow-sm transition-all hover:-translate-y-0.5 border border-outline-variant/30"
                  type="button"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    add_circle
                  </span>
                  <span>+ Add Custom Item</span>
                </button>

                {/* WhatsApp Share Button */}
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-space-xs bg-[#25D366] text-white hover:bg-[#20ba59] px-space-md py-space-sm rounded-full font-label-md text-label-md shadow-md transition-all hover:-translate-y-0.5 font-bold"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  <span>Share via WhatsApp</span>
                </button>

                {/* Print Button */}
                <button
                  onClick={() => window.print()}
                  className="p-space-sm rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors border border-outline-variant/30"
                  title="Print or Export PDF"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">print</span>
                </button>

                {/* Clear Purchased */}
                <button
                  onClick={resetAll}
                  className="inline-flex items-center gap-space-xs text-outline hover:text-error text-label-md font-label-md px-space-sm py-space-xs transition-colors"
                  title="Reset all checked items"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    restart_alt
                  </span>
                  <span>Reset Checked</span>
                </button>
              </div>
            </div>

            {/* Custom Item Form Dropdown */}
            {isAddingItem && (
              <form
                onSubmit={handleAddItem}
                className="bg-surface-container-low p-4 rounded-xl flex flex-wrap items-center gap-3 border border-outline-variant/40 animate-fadeIn"
              >
                <input
                  type="text"
                  placeholder="Item Name (e.g. Kasuri Methi)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="px-4 py-2 bg-surface-container-lowest rounded-lg border border-outline-variant/40 font-body-md text-body-md text-on-surface outline-none focus:border-primary flex-1 min-w-[200px]"
                  required
                />
                <input
                  type="text"
                  placeholder="Quantity (e.g. 250 g)"
                  value={newItemQty}
                  onChange={(e) => setNewItemQty(e.target.value)}
                  className="px-4 py-2 bg-surface-container-lowest rounded-lg border border-outline-variant/40 font-body-md text-body-md text-on-surface outline-none focus:border-primary w-32"
                />
                <select
                  value={newItemCategory}
                  onChange={(e) =>
                    setNewItemCategory(e.target.value as "veggies" | "dals" | "dairy" | "spices")
                  }
                  className="px-4 py-2 bg-surface-container-lowest rounded-lg border border-outline-variant/40 font-body-md text-body-md text-on-surface outline-none focus:border-primary"
                >
                  <option value="veggies">Vegetables &amp; Greens</option>
                  <option value="dals">Dals &amp; Grains</option>
                  <option value="dairy">Dairy Essentials</option>
                  <option value="spices">Spices &amp; Oils</option>
                </select>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container shadow-sm"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingItem(false)}
                  className="px-4 py-2 bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high"
                >
                  Cancel
                </button>
              </form>
            )}

            {/* Metric Stat Strip & Live Progress Bar */}
            <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-outline-variant/20">
              <div className="flex flex-wrap items-center gap-x-space-lg gap-y-space-xs text-body-md font-body-md">
                <div className="flex items-center gap-space-xs">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-on-surface font-semibold">{totalCount}</span>
                  <span className="text-on-surface-variant">Total Items</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <span className="text-on-surface font-semibold">{purchasedCount}</span>
                  <span className="text-on-surface-variant">
                    Purchased ({percentage}%)
                  </span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">
                    payments
                  </span>
                  <span className="text-on-surface-variant">Estimated Bazaar Cost:</span>
                  <span className="text-primary font-bold">₹1,450</span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant bg-surface-container-highest px-space-xs py-0.5 rounded">
                    Avg Mandi Rates
                  </span>
                </div>
              </div>

              {/* Progress Ring / Bar */}
              <div className="flex items-center gap-space-sm min-w-[200px]">
                <div className="flex-1 h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="font-label-md text-label-md text-secondary whitespace-nowrap font-bold">
                  {purchasedCount} of {totalCount} done
                </span>
              </div>
            </div>
          </div>

          {/* Smart Kitchen Assistant Insight Note */}
          {showPantryNote && (
            <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md border border-outline-variant/25">
              <div className="flex items-start gap-space-md">
                <div className="p-space-sm rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[24px]">kitchen</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title-md text-title-md text-on-surface">
                      {firstName}&apos;s Pantry Note &amp; Cupboard Intelligence
                    </span>
                    <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-space-xs py-0.5 rounded text-label-sm font-label-sm font-bold">
                      Saved ₹320
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                    You already have{" "}
                    <strong className="text-on-surface font-semibold">
                      3kg Whole Wheat Atta
                    </strong>
                    ,{" "}
                    <strong className="text-on-surface font-semibold">
                      1 packet Tamarind paste
                    </strong>
                    , and{" "}
                    <strong className="text-on-surface font-semibold">
                      Turmeric (Haldi)
                    </strong>{" "}
                    in your kitchen cupboard — these have been automatically excluded
                    from this week's shopping list to prevent waste!
                  </p>
                </div>
              </div>
              <button
                aria-label="Dismiss Note"
                className="text-on-surface-variant hover:text-on-surface p-space-xs rounded-full hover:bg-surface-container transition-colors flex-shrink-0 self-end sm:self-center"
                onClick={() => setShowPantryNote(false)}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          )}

          {/* Categorized Grocery Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* CATEGORY 1: FRESH VEGETABLES & GREENS */}
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-md transition-shadow hover:shadow-lg border border-outline-variant/25">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/40">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed text-xl shadow-sm">
                    🥦
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Fresh Vegetables &amp; Greens
                      </h2>
                      <span className="text-label-sm font-label-sm bg-secondary-fixed/50 text-secondary px-space-xs rounded-full font-bold">
                        Sabzi Mandi
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Recommended purchase: Early morning for freshness
                    </span>
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container-low px-space-sm py-1 rounded-full">
                  {getCategoryItems("veggies").filter((i) => i.purchased).length}/
                  {getCategoryItems("veggies").length} Bought
                </span>
              </div>

              <ul className="flex flex-col gap-space-sm">
                {getCategoryItems("veggies").map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-start gap-space-md p-space-sm rounded-lg transition-colors group cursor-pointer border border-transparent ${
                      item.purchased
                        ? "bg-surface-container-low/60"
                        : "hover:bg-surface-container-low hover:border-outline-variant/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-[6px] flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                        item.purchased
                          ? "bg-secondary text-white shadow-sm"
                          : "bg-surface-container-lowest border border-outline shadow-sm"
                      }`}
                    >
                      {item.purchased && (
                        <span className="material-symbols-outlined text-[16px] font-bold">
                          check
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                      <div className="flex flex-col">
                        <span
                          className={`font-title-md text-title-md transition-all ${
                            item.purchased
                              ? "text-on-surface-variant line-through opacity-60"
                              : "text-on-surface"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {item.sub}
                        </span>
                      </div>
                      <div className="flex items-center gap-space-xs self-start sm:self-center">
                        <span className="font-label-md text-label-md bg-surface-container-highest text-on-surface-variant px-space-sm py-0.5 rounded-full whitespace-nowrap">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CATEGORY 2: DALS, LENTILS & GRAINS */}
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-md transition-shadow hover:shadow-lg border border-outline-variant/25">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/40">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed text-xl shadow-sm">
                    🌾
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Dals, Lentils &amp; Grains
                      </h2>
                      <span className="text-label-sm font-label-sm bg-tertiary-fixed/50 text-tertiary px-space-xs rounded-full font-bold">
                        Kirana Store
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Organic unpolished preferred
                    </span>
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container-low px-space-sm py-1 rounded-full">
                  {getCategoryItems("dals").filter((i) => i.purchased).length}/
                  {getCategoryItems("dals").length} Bought
                </span>
              </div>

              <ul className="flex flex-col gap-space-sm">
                {getCategoryItems("dals").map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-start gap-space-md p-space-sm rounded-lg transition-colors group cursor-pointer border border-transparent ${
                      item.purchased
                        ? "bg-surface-container-low/60"
                        : "hover:bg-surface-container-low hover:border-outline-variant/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-[6px] flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                        item.purchased
                          ? "bg-secondary text-white shadow-sm"
                          : "bg-surface-container-lowest border border-outline shadow-sm"
                      }`}
                    >
                      {item.purchased && (
                        <span className="material-symbols-outlined text-[16px] font-bold">
                          check
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-space-xs">
                          <span
                            className={`font-title-md text-title-md transition-all ${
                              item.purchased
                                ? "text-on-surface-variant line-through opacity-60"
                                : "text-on-surface"
                            }`}
                          >
                            {item.name}
                          </span>
                          {item.highlightTag && (
                            <span className="bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm px-1.5 py-0.5 rounded-full font-bold">
                              {item.highlightTag}
                            </span>
                          )}
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {item.sub}
                        </span>
                      </div>
                      <div className="flex items-center gap-space-xs self-start sm:self-center">
                        <span className="font-label-md text-label-md bg-surface-container-high text-on-surface px-space-sm py-0.5 rounded-full whitespace-nowrap">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CATEGORY 3: DAIRY & FRESH ESSENTIALS */}
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-md transition-shadow hover:shadow-lg border border-outline-variant/25">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/40">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-xl shadow-sm">
                    🥛
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Dairy &amp; Fresh Essentials
                      </h2>
                      <span className="text-label-sm font-label-sm bg-surface-container text-on-surface-variant px-space-xs rounded-full font-bold">
                        Dairy Booth
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Keep chilled immediately
                    </span>
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container-low px-space-sm py-1 rounded-full">
                  {getCategoryItems("dairy").filter((i) => i.purchased).length}/
                  {getCategoryItems("dairy").length} Bought
                </span>
              </div>

              <ul className="flex flex-col gap-space-sm">
                {getCategoryItems("dairy").map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-start gap-space-md p-space-sm rounded-lg transition-colors group cursor-pointer border border-transparent ${
                      item.purchased
                        ? "bg-surface-container-low/60"
                        : "hover:bg-surface-container-low hover:border-outline-variant/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-[6px] flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                        item.purchased
                          ? "bg-secondary text-white shadow-sm"
                          : "bg-surface-container-lowest border border-outline shadow-sm"
                      }`}
                    >
                      {item.purchased && (
                        <span className="material-symbols-outlined text-[16px] font-bold">
                          check
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-space-xs">
                          <span
                            className={`font-title-md text-title-md transition-all ${
                              item.purchased
                                ? "text-on-surface-variant line-through opacity-60"
                                : "text-on-surface"
                            }`}
                          >
                            {item.name}
                          </span>
                          {item.highlightTag && (
                            <span className="text-secondary text-label-sm font-label-sm bg-secondary-fixed/40 px-1.5 py-0.5 rounded-full font-bold">
                              {item.highlightTag}
                            </span>
                          )}
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {item.sub}
                        </span>
                      </div>
                      <div className="flex items-center gap-space-xs self-start sm:self-center">
                        <span className="font-label-md text-label-md bg-surface-container-high text-on-surface px-space-sm py-0.5 rounded-full whitespace-nowrap">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CATEGORY 4: SPICES & OILS */}
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-md transition-shadow hover:shadow-lg border border-outline-variant/25">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/40">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-xl shadow-sm">
                    🌶️
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Spices, Oils &amp; Pantry Essentials
                      </h2>
                      <span className="text-label-sm font-label-sm bg-primary-fixed/50 text-primary px-space-xs rounded-full font-bold">
                        Masala Dabba
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Aromatic dry stores
                    </span>
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container-low px-space-sm py-1 rounded-full">
                  {getCategoryItems("spices").filter((i) => i.purchased).length}/
                  {getCategoryItems("spices").length} Bought
                </span>
              </div>

              <ul className="flex flex-col gap-space-sm">
                {getCategoryItems("spices").map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-start gap-space-md p-space-sm rounded-lg transition-colors group cursor-pointer border border-transparent ${
                      item.purchased
                        ? "bg-surface-container-low/60"
                        : "hover:bg-surface-container-low hover:border-outline-variant/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-[6px] flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                        item.purchased
                          ? "bg-secondary text-white shadow-sm"
                          : "bg-surface-container-lowest border border-outline shadow-sm"
                      }`}
                    >
                      {item.purchased && (
                        <span className="material-symbols-outlined text-[16px] font-bold">
                          check
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                      <div className="flex flex-col">
                        <span
                          className={`font-title-md text-title-md transition-all ${
                            item.purchased
                              ? "text-on-surface-variant line-through opacity-60"
                              : "text-on-surface"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {item.sub}
                        </span>
                      </div>
                      <div className="flex items-center gap-space-xs self-start sm:self-center">
                        <span className="font-label-md text-label-md bg-surface-container-high text-on-surface px-space-sm py-0.5 rounded-full whitespace-nowrap">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
