"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AiMealGenModal } from "./AiMealGenModal";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Weekly Planner", href: "/weekly-planner" },
    { label: "Recipes", href: "/recipes" },
    { label: "Favourites", href: "/favourites" },
    { label: "Suggestions", href: "/suggestions" },
    { label: "Grocery List", href: "/grocery-list" },
    { label: "Family", href: "/family-preferences" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(44,34,30,0.05)] border-b border-surface-container-high/40">
        <div className="h-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-105 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">soup_kitchen</span>
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-lg sm:text-xl font-bold text-primary tracking-tight leading-tight">
                RecipeBox
              </span>
              <span className="text-[11px] text-on-surface-variant font-normal">
                {profile?.full_name && !profile.id.startsWith("demo-")
                  ? `${profile.full_name.split(" ")[0]}'s Meal Planner`
                  : "Amma's Meal Planner"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Pill Bar */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low px-1.5 py-1.5 rounded-full shadow-[0_1px_4px_rgba(44,34,30,0.03)] border border-outline-variant/30">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Create Recipe CTA Button */}
            <Link
              href="/recipes/create"
              className="hidden sm:inline-flex items-center gap-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-3.5 py-2 rounded-full text-xs font-bold border border-outline-variant/30 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-base text-primary">add_circle</span>
              <span>Create</span>
            </Link>

            {/* Quick AI Meal Gen Button */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="hidden xl:inline-flex items-center gap-1.5 bg-primary text-on-primary hover:bg-primary-container px-3.5 py-2 rounded-full text-xs font-bold shadow-[0_2px_8px_rgba(159,60,22,0.2)] transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <span>AI Plan</span>
            </button>

            {/* Notifications Button & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
                className="relative p-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-surface" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl shadow-2xl p-4 border border-outline-variant/40 z-50 flex flex-col gap-3 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
                    <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                      Kitchen Alerts (2)
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      Dismiss
                    </button>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container-low">
                      <span className="material-symbols-outlined text-secondary text-lg mt-0.5">
                        notifications_active
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs text-secondary font-bold">
                          Tonight&apos;s Prep Reminder
                        </span>
                        <p className="text-xs text-on-surface">
                          Soak 1 cup Rajma tonight for tomorrow&apos;s Amritsari lunch!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container-low">
                      <span className="material-symbols-outlined text-tertiary text-lg mt-0.5">
                        local_mall
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs text-tertiary font-bold">
                          Mandi Grocery Checklist
                        </span>
                        <p className="text-xs text-on-surface">
                          18 items planned • Check off produce as you buy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown / Auth CTA */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 bg-surface-container-low pl-1 pr-2.5 py-1 rounded-full shadow-sm border border-outline-variant/30 hover:bg-surface-container-high transition-colors"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden relative shadow-inner">
                    <Image
                      alt={profile?.full_name || "Profile"}
                      src={
                        profile?.avatar_url ||
                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                      }
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-on-surface truncate max-w-[100px]">
                    {profile?.full_name?.split(" ")[0] || "Chef"}
                  </span>
                  <span className="material-symbols-outlined text-sm text-outline">
                    arrow_drop_down
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-2xl p-2 border border-outline-variant/30 z-50 flex flex-col gap-1 animate-fadeIn">
                    <div className="p-2.5 border-b border-surface-container-high">
                      <p className="text-xs font-bold text-on-surface">
                        {profile?.full_name || user?.user_metadata?.full_name || "Home Chef"}
                      </p>
                      <p className="text-[11px] text-on-surface-variant truncate">
                        {user.email || profile?.email || ""}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-base text-primary">person</span>
                      <span>My Profile</span>
                    </Link>

                    <Link
                      href="/favourites"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-base text-primary">favorite</span>
                      <span>Saved Favourites</span>
                    </Link>

                    <Link
                      href="/recipes/create"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-base text-secondary">add_circle</span>
                      <span>Create Recipe</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        signOut();
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-primary hover:bg-primary/10 transition-colors w-full text-left"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-full bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-sm transition-all"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-6 py-4 flex flex-col gap-2 animate-fadeIn shadow-lg">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                    active
                      ? "bg-primary text-on-primary font-bold shadow-sm"
                      : "text-on-surface hover:bg-surface-container-low font-medium"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-outline-variant/20 flex flex-col gap-2">
              <Link
                href="/recipes/create"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 bg-secondary text-on-secondary rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Add Recipe</span>
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAiModalOpen(true);
                }}
                className="w-full py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                <span>Quick AI Meal Gen</span>
              </button>

              {user ? (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-surface-container text-on-surface rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">person</span>
                  <span>My Profile</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-surface-container text-on-surface rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Sign In / Register</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* AI Meal Generator Modal */}
      <AiMealGenModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
}
