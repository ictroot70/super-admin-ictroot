'use client'

import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useEffect } from 'react'

import { SuperAdminLayoutShell } from '@/app/super-admin-layout-shell'
import { useAdminSessionStore } from '@/features/admin/auth/model/admin-session.store'
import { Loading } from '@/shared/composites'

type Props = Readonly<{ children: ReactNode }>

export default function Layout({ children }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const isLoggedIn = useAdminSessionStore(state => state.isLoggedIn)
  const hasHydrated = useAdminSessionStore(state => state.hasHydrated)

  const shouldRedirectToUsers = hasHydrated && pathname === '/login' && isLoggedIn
  const shouldRedirectToLogin = hasHydrated && pathname !== '/login' && !isLoggedIn

  useEffect(() => {
    if (shouldRedirectToUsers) {
      router.replace('/users')

      return
    }

    if (shouldRedirectToLogin) {
      router.replace('/login')
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
