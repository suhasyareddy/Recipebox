"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { DietaryPreferenceSelector } from "@/components/DietaryBadge";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, isConfigured } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dietary, setDietary] = useState("Vegetarian");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessNotice(null);

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const { error, needsEmailConfirmation } = await signUp(email, password, fullName, dietary);
      if (error) {
        setErrorMsg(error);
        showToast("error", "Registration Failed", error);
      } else if (needsEmailConfirmation) {
        setSuccessNotice("Registration successful! A verification link has been sent to your email. Check your inbox to confirm your account and sign in.");
        showToast("info", "Verification Email Sent", "Please check your inbox to confirm your email address.");
      } else {
        showToast("success", "Welcome to RecipeBox!", "Your culinary profile has been established.");
        router.push("/profile");
      }
    } catch {
      setErrorMsg("An unexpected error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-surface-container-lowest p-8 sm:p-10 rounded-3xl border border-outline-variant/30 shadow-xl shadow-surface-container-high/40">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/10 text-secondary mb-2">
            <span className="material-symbols-outlined text-3xl">menu_book</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-on-surface font-semibold">
            Create an Account
          </h1>
          <p className="text-on-surface-variant text-sm">
            Join the RecipeBox family kitchen to organize recipes, share culinary traditions, and plan meals.
          </p>
        </div>

        {/* Form Error or Rate Limit Helper */}
        {errorMsg?.toLowerCase().includes("rate limit") ? (
          <div className="p-4 bg-tertiary-fixed/30 border border-tertiary/30 rounded-2xl text-xs text-on-surface space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-tertiary">
              <span className="material-symbols-outlined text-lg shrink-0">speed</span>
              <span>Supabase Email Rate Limit Exceeded</span>
            </div>
            <p className="text-on-surface leading-relaxed">
              Supabase free tier limits automated verification emails (~3 per hour). To solve this permanently for local development:
            </p>
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1.5 text-on-surface-variant font-medium">
              <p className="font-bold text-on-surface text-[11px] uppercase tracking-wider">
                Permanent Fix (Takes 10 Seconds):
              </p>
              <p>1. Open <strong>Supabase Dashboard &gt; Authentication &gt; Providers &gt; Email</strong></p>
              <p>2. Uncheck <strong>&ldquo;Confirm email&rdquo;</strong> and click <strong>Save</strong>.</p>
              <p className="text-[11px] text-tertiary pt-1">
                This enables immediate sign-ups without sending verification emails!
              </p>
            </div>
            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-on-surface-variant">Already created an account?</span>
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs inline-flex items-center gap-1 shadow-sm"
              >
                <span>Go to Sign In</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>
        ) : errorMsg && (
          <div className="p-3.5 bg-primary/10 border border-primary/20 rounded-2xl text-xs text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-base shrink-0">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Notice (e.g. Email confirmation required) */}
        {successNotice && (
          <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-2xl text-xs text-secondary space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-lg shrink-0">mark_email_read</span>
              <span>Verification Required</span>
            </div>
            <p className="leading-relaxed">{successNotice}</p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
              >
                <span>Proceed to Sign In</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
                person
              </span>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm text-on-surface transition-all placeholder:text-outline/70"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="amma@recipebox.internal"
                className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm text-on-surface transition-all placeholder:text-outline/70"
              />
            </div>
          </div>

          <DietaryPreferenceSelector value={dietary} onChange={setDietary} />

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
              Password (min 6 characters)
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
                lock
              </span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm text-on-surface transition-all placeholder:text-outline/70"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
                lock_clock
              </span>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm text-on-surface transition-all placeholder:text-outline/70"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-on-surface-variant">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </main>
  );
}
