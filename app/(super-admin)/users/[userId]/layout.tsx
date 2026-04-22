"use client";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import type { ReactNode } from "react";

import { APP_ROUTES } from "@/shared/constant";
import { Tabs } from "@/shared/ui/tabs";

const USER_TABS = {
  UPLOADED_PHOTOS: "uploaded-photos",
  PAYMENTS: "payments",
  FOLLOWERS: "followers",
  FOLLOWING: "following",
} as const;

type UserTab = (typeof USER_TABS)[keyof typeof USER_TABS];

const TAB_TRIGGERS = [
  { value: USER_TABS.UPLOADED_PHOTOS, title: "Uploaded photos" },
  { value: USER_TABS.PAYMENTS, title: "Payments" },
  { value: USER_TABS.FOLLOWERS, title: "Followers" },
  { value: USER_TABS.FOLLOWING, title: "Following" },
];

const isUserTab = (value: string | null): value is UserTab =>
  value === USER_TABS.UPLOADED_PHOTOS ||
  value === USER_TABS.PAYMENTS ||
  value === USER_TABS.FOLLOWERS ||
  value === USER_TABS.FOLLOWING;

export default function UserDetailsLayout({
  children,
}: {
  children: ReactNode;
  params: { userId: string };
}) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const activeTab = isUserTab(segment) ? segment : USER_TABS.UPLOADED_PHOTOS;

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-6">
      <Link
        href="/users"
        className="mb-6 inline-block text-sm text-zinc-300 hover:text-white"
      >
        {"<- Back to Users List"}
      </Link>

      <div className="mb-6 rounded-md border border-zinc-800 bg-zinc-950 p-4">
        {"Avatar + username + userId + creationDate"}
      </div>

      <Tabs
        value={activeTab}
        triggers={TAB_TRIGGERS}
        onValueChange={(next) =>
          router.push(`${APP_ROUTES.USERS.ID(15)}/${next}`)
        }
        fullWidth
      />

      <div className="mt-6">{children}</div>
    </section>
  );
}
