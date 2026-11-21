"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, loginAsDemoUser, isConfigured } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg("Please enter both your email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMsg(error);
        showToast("error", "Sign In Failed", error);
      } else {
        showToast("success", "Welcome Back!", "You have successfully signed into RecipeBox.");
        router.push("/profile");
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemoUser();
    showToast("info", "Guest Mode Activated", "Signed in as Amma Lakshmi for local testing.");
    router.push("/profile");
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-surface-container-lowest p-8 sm:p-10 rounded-3xl border border-outline-variant/30 shadow-xl shadow-surface-container-high/40">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-2">
            <span className="material-symbols-outlined text-3xl">restaurant_menu</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-on-surface font-semibold">
            Welcome to RecipeBox
          </h1>
          <p className="text-on-surface-variant text-sm">
            Sign in to access your family recipes, weekly meal plans, and grocery lists.
          </p>
        </div>

        {/* Demo Mode Notice */}
        {!isConfigured && (
          <div className="p-3.5 bg-tertiary-fixed/30 border border-tertiary/20 rounded-2xl text-xs text-on-surface flex items-start gap-2.5">
            <span className="material-symbols-outlined text-tertiary text-lg shrink-0 mt-0.5">
              info
            </span>
            <div className="flex-1">
              <span className="font-semibold block text-tertiary">Quick Preview Mode</span>
              Supabase credentials are not yet configured in <code className="bg-black/5 px-1 py-0.5 rounded">.env</code>. You can log in with demo credentials instantly!
            </div>
          </div>
        )}

        {/* Form Error */}
        {errorMsg && (
          <div className="p-3.5 bg-primary/10 border border-primary/20 rounded-2xl text-xs text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-base shrink-0">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">
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

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
                lock
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm text-on-surface transition-all placeholder:text-outline/70"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/30" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface-container-lowest px-3 text-outline">Or</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-3 px-4 bg-secondary/10 hover:bg-secondary/15 text-secondary font-semibold text-sm rounded-xl border border-secondary/20 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">face</span>
          <span>Continue as Guest / Demo Chef</span>
        </button>

        {/* Footer Link */}
        <p className="text-center text-xs text-on-surface-variant">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
