"use client";

import { create } from "zustand";

type AdminSessionState = {
  email: string | null;
  password: string | null;
  isLoggedIn: boolean;
  setSession: (email: string, password: string) => void;
  clearSession: () => void;
};

export const useAdminSessionStore = create<AdminSessionState>((set) => ({
  email: null,
  password: null,
  isLoggedIn: false,

  setSession: (email, password) =>
    set({
      email,
      password,
      isLoggedIn: true,
    }),

  clearSession: () =>
    set({
      email: null,
      password: null,
      isLoggedIn: false,
    }),
}));
