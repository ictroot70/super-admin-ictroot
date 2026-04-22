// app/(super-admin)/login/page.tsx
'use client'

import { LoginForm } from "@/features/admin/auth/ui/login-form"

export default function LoginPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-md flex-col items-center justify-center py-16 px-4">
        <div className="w-full mb-8 text-center">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            🔐 Вход
          </h1>
        </div>
        <LoginForm />
      </main>
    </div>
  )
}