'use client'

import type { ReactNode } from 'react'

import { ScrollAreaRadix } from '@/shared/ui'
import { Sidebar } from '@/widgets/Sidebar'

type SuperAdminLayoutShellProps = Readonly<{ children: ReactNode }>

export function SuperAdminLayoutShell({ children }: SuperAdminLayoutShellProps) {
  return (
    <main className={'m-0 box-border block h-screen min-h-0 w-full max-w-none pt-15'}>
      <ScrollAreaRadix className={'h-full w-full'} viewportClassName={'w-full h-full'}>
        <div
          className={
            'mx-auto h-full min-h-full w-full max-w-(--layout-max-width) self-stretch px-8'
          }
        >
          <Sidebar />
          <div className={'relative ml-40 h-full min-h-full self-stretch py-9 pl-6'}>
            {children}
          </div>
        </div>
      </ScrollAreaRadix>
    </main>
  )
}
