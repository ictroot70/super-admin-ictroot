"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAdminSessionStore } from "@/features/admin/auth/model/admin-session.store";
import { ADMIN_ROUTES } from "@/shared/constant/admin-routes";


export function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  const isLoggedIn = useAdminSessionStore((state) => state.isLoggedIn);
  const hasHydrated = useAdminSessionStore((state) => state.hasHydrated);

  const shouldRedirectToUsers =
    hasHydrated && pathname === ADMIN_ROUTES.LOGIN && isLoggedIn;
  const shouldRedirectToLogin =
    hasHydrated && pathname !== ADMIN_ROUTES.LOGIN && !isLoggedIn;

  useEffect(() => {
    if (shouldRedirectToUsers) {
      router.replace(ADMIN_ROUTES.USERS);
      return;
    }

    if (shouldRedirectToLogin) {
      router.replace(ADMIN_ROUTES.LOGIN);
    }
  }, [router, shouldRedirectToLogin, shouldRedirectToUsers]);

  return {
    shouldShowLoading: !hasHydrated || shouldRedirectToUsers || shouldRedirectToLogin,
    hasHydrated,
  };
}
