"use client";

import Link from "next/link";
import {
  notFound,
  useParams,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

import type { ReactNode } from "react";

import { APP_ROUTES } from "@/shared/constant";

import {
  DEFAULT_USER_TAB,
  USER_TAB_TRIGGERS,
  isUserTab,
} from "@/features/admin/user-details/model";
import { Tabs } from "@/shared/ui/tabs";
import { parseUserIdParam } from "@/shared/lib/route-params";

type Props = {
  children: ReactNode;
};

export default function UserDetailsLayout({ children }: Props) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const activeTab = isUserTab(segment) ? segment : DEFAULT_USER_TAB;

  const params = useParams<{ userId: string }>();
  const userId = parseUserIdParam(params.userId);

  if (userId === null) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-6">
      <Link
        href={APP_ROUTES.USERS.ROOT}
        className="mb-6 inline-block text-sm text-zinc-300 hover:text-white"
      >
        {"<- Back to Users List"}
      </Link>

      <div className="mb-6 rounded-md border border-zinc-800 bg-zinc-950 p-4">
        {"Avatar + username + userId + creationDate"}
      </div>

      <Tabs
        value={activeTab}
        triggers={USER_TAB_TRIGGERS}
        onValueChange={(next) =>
          router.push(`${APP_ROUTES.USERS.ID(userId)}/${next}`)
        }
        fullWidth
      />

      <div className="mt-6">{children}</div>
    </section>
  );
}
