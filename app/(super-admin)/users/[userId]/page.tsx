import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/shared/constant";

type Props = {
  params: Promise<{ userId: string }>;
};

export default async function Page({ params }: Props) {
  const { userId } = await params;

  redirect(APP_ROUTES.USERS.UPLOADED_PHOTOS(userId));
}

