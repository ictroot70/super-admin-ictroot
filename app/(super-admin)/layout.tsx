'use client'

import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useEffect } from 'react'

import { SuperAdminLayoutShell } from '@/app/SuperAdminLayoutShell'
import { useAdminSessionStore } from '@/features/admin/auth/model/adminSessionStore'
import { APP_ROUTES } from '@/shared/constant'
import { Loading } from '@/shared/ui'

type Props = Readonly<{ children: ReactNode }>

export default function Layout({ children }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const isLoggedIn = useAdminSessionStore(state => state.isLoggedIn)
  const hasHydrated = useAdminSessionStore(state => state.hasHydrated)

  const shouldRedirectToUsers = hasHydrated && pathname === APP_ROUTES.AUTH.LOGIN && isLoggedIn
  const shouldRedirectToLogin = hasHydrated && pathname !== APP_ROUTES.AUTH.LOGIN && !isLoggedIn

  useEffect(() => {
    if (shouldRedirectToUsers) {
      router.replace(APP_ROUTES.USERS.ROOT)

      return
    }

    if (shouldRedirectToLogin) {
      router.replace(APP_ROUTES.AUTH.LOGIN)
    }
  }, [router, shouldRedirectToLogin, shouldRedirectToUsers])

  if (!hasHydrated || shouldRedirectToUsers || shouldRedirectToLogin) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  if (!isLoggedIn) {
    return <>{children}</>
  }

  return <SuperAdminLayoutShell>{children}</SuperAdminLayoutShell>
}
