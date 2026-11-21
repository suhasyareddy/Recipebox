"use client";

import React from "react";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavouritesProvider } from "@/context/FavouritesContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <FavouritesProvider>{children}</FavouritesProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
