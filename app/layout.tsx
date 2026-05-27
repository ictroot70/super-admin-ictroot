import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { ApolloAppProvider } from '@/app/providers/apollo'
import { ToastProvider } from '@/app/providers/toast'
import { AppHeader } from '@/widgets/header'

import '@fontsource-variable/inter/index.css'
import '@fontsource-variable/roboto/index.css'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Super Admin',
  description: 'Super admin dashboard for ICTRoot',
  authors: [{ name: 'Ictroot Team', url: 'https://ictroot.uk' }],
  metadataBase: new URL('https://ictroot.uk'),
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={'ru'} className={'h-full overflow-x-hidden antialiased'}>
      <body className={'flex min-h-full flex-col overflow-x-hidden'}>
        <ApolloAppProvider>
          <AppHeader />
          {children}
          <ToastProvider />
        </ApolloAppProvider>
      </body>
    </html>
  )
}
