import { notFound } from "next/navigation";
import type { ComponentType } from "react";

import {
  UploadedPhotos,
  Payments,
  Followers,
  Following,
} from "@/features/admin/user-details/ui";

type UserDetailsTab =
  | "uploaded-photos"
  | "payments"
  | "followers"
  | "following";

const TAB_TO_COMPONENT_MAP: Record<UserDetailsTab, ComponentType> = {
  "uploaded-photos": UploadedPhotos,
  payments: Payments,
  followers: Followers,
  following: Following,
};

type Props = {
  params: Promise<{
    tab: string;
  }>;
};

export default async function UserDetailsTabPage({ params }: Props) {
  const { tab } = await params;
  const currentTab = tab as UserDetailsTab;
  const SelectedTabComponent = TAB_TO_COMPONENT_MAP[currentTab];

  if (!SelectedTabComponent) {
    notFound();
  }

  return <SelectedTabComponent />;
}
