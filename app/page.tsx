'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAdminSessionStore } from '@/features/admin/auth/model/admin-session.store'

export default function Home() {
  const router = useRouter()
  const isLoggedIn = useAdminSessionStore(state => state.isLoggedIn)
  const hasHydrated = useAdminSessionStore(state => state.hasHydrated)

  useEffect(() => {
    if (!hasHydrated) {
      return
    }

    if (isLoggedIn) {
      router.replace('/users')

      return
    }

    router.replace('/login')
  }, [hasHydrated, isLoggedIn, router])

  return null
}
