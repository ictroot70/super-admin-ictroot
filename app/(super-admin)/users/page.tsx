"use client";

import { useRouter } from "next/navigation";

import { useAdminSessionStore } from "@/features/admin/auth/model/admin-session.store";
import { Users } from "@/features/admin/users/ui/Users";


export default function Page() {
  const router = useRouter();
  const clearSession = useAdminSessionStore((state) => state.clearSession);

  // const handleLogout = () => {
  //   clearSession();
  //   router.replace(ADMIN_ROUTES.LOGIN);
  // };

  return (
    <div className={"flex flex-col min-h-screen bg-black"}>
      <main className={"flex-1"}>
        <Users />
      </main>
    </div>
  );
}
