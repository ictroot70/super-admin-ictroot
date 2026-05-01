"use client";

import { Button } from "@ictroot/ui-kit";
import { useRouter } from "next/navigation";

import { useAdminSessionStore } from "@/features/admin/auth/model/admin-session.store";
import { Users } from "@/features/admin/users/ui/Users";

export default function Page() {
  const router = useRouter();
  const clearSession = useAdminSessionStore((state) => state.clearSession);

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex justify-end p-4 border-b border-dark-100">
        <Button type="button" variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <main className="flex-1">
        <Users />
      </main>
    </div>
  );
}
