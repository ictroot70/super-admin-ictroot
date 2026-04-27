'use client'

import type { ReactNode } from 'react'

import { ApolloAppProvider } from '@/app/providers/apollo/apollo-provider'
import { useAdminAccessGate } from '@/features/admin/auth'
import { Sidebar } from '@/widgets/Sidebar'

type SuperAdminLayoutShellProps = Readonly<{ children: ReactNode }>

export function SuperAdminLayoutShell({ children }: SuperAdminLayoutShellProps) {
  const { mounted, isAuthorized } = useAdminAccessGate()

  if (!mounted) {
    return null
  }

  if (!isAuthorized) {
    return <ApolloAppProvider>{children}</ApolloAppProvider>
  }

  return (
    <ApolloAppProvider>
      <div className={'pt-[60px]'}>
        <Sidebar />
        <main className={'w-full pl-[252px]'}>{children}</main>
      </div>
    </ApolloAppProvider>
  )
}
