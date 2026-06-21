'use client'
import { Users } from '@/features/admin/users/ui/Users'

export default function Page() {
  return (
    <div className={'flex min-h-screen flex-col'}>
      <main className={'flex-1'}>
        <Users />
      </main>
    </div>
  )
}
