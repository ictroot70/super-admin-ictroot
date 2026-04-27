'use client'

import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'

export const SUPER_ADMIN_MOCK_SESSION_KEY = 'sa_mock_logged_in'

type AdminAccessGate = {
  mounted: boolean
  isAuthorized: boolean
}

const subscribe = () => () => {}

const getMockLoggedInSnapshot = (): boolean =>
  sessionStorage.getItem(SUPER_ADMIN_MOCK_SESSION_KEY) === 'true'

export const useAdminAccessGate = (): AdminAccessGate => {
  const pathname = usePathname()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
  const isMockLoggedIn = useSyncExternalStore(subscribe, getMockLoggedInSnapshot, () => false)

  // A1 integration point: replace mock flag with useAdminSessionStore(state => state.isLoggedIn)
  const isAuthorized = mounted && pathname !== '/login' && isMockLoggedIn

  return { mounted, isAuthorized }
}
