"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ApolloAppProvider } from "@/app/providers/apollo";
import { useAdminSessionStore } from "@/features/admin/auth/model/admin-session.store";

type Props = Readonly<{ children: ReactNode }>;

export default function Layout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useAdminSessionStore((state) => state.isLoggedIn);
  const hasHydrated = useAdminSessionStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (pathname === "/login" && isLoggedIn) {
      router.replace("/users");
      return;
    }

    if (pathname !== "/login" && !isLoggedIn) {
      router.replace("/login");
    }
  }, [hasHydrated, isLoggedIn, pathname, router]);

  if (!hasHydrated) {
    return null;
  }

  return <ApolloAppProvider>{children}</ApolloAppProvider>;
}
