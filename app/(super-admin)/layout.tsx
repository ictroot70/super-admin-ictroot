"use client";

import { Suspense, type ReactNode } from "react";

import { ApolloAppProvider } from "@/app/providers/apollo";
import { Loading } from "@/shared/composites";
import { ADMIN_ROUTES } from "@/shared/constant/admin-routes";
import { useAuthRedirect } from "./_hooks/use-auth-redirect";

type Props = Readonly<{ children: ReactNode }>;

export default function Layout({ children }: Props) {
  const { shouldShowLoading } = useAuthRedirect();

  if (shouldShowLoading) {
    return (
      <ApolloAppProvider>
        <div className="flex items-center justify-center min-h-screen">
          <Loading />
        </div>
      </ApolloAppProvider>
    );
  }

  return (
    <ApolloAppProvider>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ApolloAppProvider>
  );
}

// Export route constants for external use
export { ADMIN_ROUTES };
