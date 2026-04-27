// # More information

"use client";

import { Button } from "@ictroot/ui-kit";
import { useRouter } from "next/navigation";

import { useAdminSessionStore } from "@/features/admin/auth/model/admin-session.store";

export default function Page() {
  const router = useRouter();
  const clearSession = useAdminSessionStore((state) => state.clearSession);

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-4">
      <h1 className="text-2xl font-semibold text-white">Users</h1>

      <Button type="button" variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
