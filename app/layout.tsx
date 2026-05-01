import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import '@fontsource-variable/inter'
import '@fontsource-variable/roboto'
import './globals.css'

export const metadata: Metadata = {
  title: 'Super Admin',
  description: 'Super admin dashboard for ICTRoot',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={'en'} className={'h-full antialiased'}>
      <body className={'flex min-h-full flex-col'}>{children}</body>
    </html>
  )
}
