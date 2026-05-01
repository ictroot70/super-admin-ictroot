"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AdminSessionState = {
  email: string | null;
  password: string | null;
  isLoggedIn: boolean;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  setSession: (email: string, password: string) => void;
  clearSession: () => void;
};

export const useAdminSessionStore = create<AdminSessionState>()(
  persist(
    (set) => ({
      email: null,
      password: null,
      isLoggedIn: false,
      hasHydrated: false,

      setHasHydrated: (value) =>
        set({
          hasHydrated: value,
        }),

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
    }),
    {
      name: "admin-session",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
