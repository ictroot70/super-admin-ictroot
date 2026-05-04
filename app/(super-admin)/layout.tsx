'use client'

import { ReactNode } from 'react'

import { ApolloAppProvider } from '@/app/providers/apollo/apollo-provider'
import { useAdminAccessGate } from '@/features/admin/auth'
import { Sidebar } from '@/widgets/Sidebar'

type Props = Readonly<{ children: ReactNode }>

export default function Layout({ children }: Props) {
  const { mounted, isAuthorized } = useAdminAccessGate()

  if (!mounted) {
    return null
  }

  if (!isAuthorized) {
    return <>{children}</>
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
