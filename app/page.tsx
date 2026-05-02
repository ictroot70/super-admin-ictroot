"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAdminSessionStore } from "@/features/admin/auth/model/admin-session.store";
import { ADMIN_ROUTES } from "@/shared/constant/admin-routes";

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useAdminSessionStore((state) => state.isLoggedIn);
  const hasHydrated = useAdminSessionStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (isLoggedIn) {
      router.replace(ADMIN_ROUTES.USERS);
      return;
    }

    router.replace(ADMIN_ROUTES.LOGIN);
  }, [hasHydrated, isLoggedIn, router]);

  return null;
}
