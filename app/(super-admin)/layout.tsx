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

  const shouldRedirectToUsers =
    hasHydrated && pathname === "/login" && isLoggedIn;
  const shouldRedirectToLogin =
    hasHydrated && pathname !== "/login" && !isLoggedIn;

  useEffect(() => {
    if (shouldRedirectToUsers) {
      router.replace("/users");
      return;
    }

    if (shouldRedirectToLogin) {
      router.replace("/login");
    }
  }, [router, shouldRedirectToLogin, shouldRedirectToUsers]);

  if (!hasHydrated || shouldRedirectToUsers || shouldRedirectToLogin) {
    return <ApolloAppProvider>Loading...</ApolloAppProvider>;
  }

  return <ApolloAppProvider>{children}</ApolloAppProvider>;
}
