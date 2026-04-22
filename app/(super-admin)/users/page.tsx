// app/(super-admin)/users/page.tsx
'use client'

import { Users } from '@/features/admin/users/ui/Users'

export default function UsersPage() {
  return (
    <div className="flex flex-col flex-1 items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <Users />
    </div >
  )
}