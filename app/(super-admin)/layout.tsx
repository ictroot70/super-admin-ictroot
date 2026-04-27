import type { ReactNode } from 'react'

import { SuperAdminLayoutShell } from '@/app/super-admin-layout-shell'

type LayoutProps = Readonly<{ children: ReactNode }>

export default function Layout({ children }: LayoutProps) {
  return <SuperAdminLayoutShell>{children}</SuperAdminLayoutShell>
}
