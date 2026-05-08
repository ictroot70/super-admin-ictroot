import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { ApolloAppProvider } from '@/app/providers/apollo'
import { AppHeader } from '@/widgets/Header'

import '@fontsource-variable/inter'
import '@fontsource-variable/roboto'
import './globals.css'

export const metadata: Metadata = {
  title: 'Super Admin',
  description: 'Super admin dashboard for ICTRoot',
  authors: [{ name: 'Ictroot Team', url: 'https://ictroot.uk' }],
  metadataBase: new URL('https://ictroot.uk'),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={'en'} className={'h-full antialiased'}>
      <body className={'min-h-full'}>
        <ApolloAppProvider>
          <AppHeader />
          {children}
        </ApolloAppProvider>
      </body>
    </html>
  )
}
