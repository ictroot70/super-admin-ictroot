'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAdminSessionStore } from '@/features/admin/auth/model/adminSessionStore'
import { APP_ROUTES } from '@/shared/constant/appRoutes'

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

    router.replace(APP_ROUTES.AUTH.LOGIN)
  }, [hasHydrated, isLoggedIn, router])

  return null
}
