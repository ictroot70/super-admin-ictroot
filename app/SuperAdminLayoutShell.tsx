'use client'

import type { ReactNode } from 'react'

import { Sidebar } from '@/widgets/sidebar'

type SuperAdminLayoutShellProps = Readonly<{ children: ReactNode }>

export function SuperAdminLayoutShell({ children }: SuperAdminLayoutShellProps) {
  return (
    <main className={'w-full overflow-x-clip pt-15'}>
      <div className={'mx-auto min-h-[calc(100vh-60px)] w-full max-w-(--layout-max-width) px-15'}>
        <Sidebar />
        <div className={'relative ml-40 min-h-[calc(100vh-60px)] min-w-0 py-8 pl-6'}>
          {children}
        </div>
      </div>
    </main>
  )
}
