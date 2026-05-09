import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Geist, Geist_Mono } from 'next/font/google' // 🔥 Добавьте, если используете Geist

// 🔥 Импорт провайдера — используйте абсолютный путь (как в A6.2)
import { ApolloAppProvider } from '@/app/providers/apollo'
// 🔥 AppHeader из A6.2 — нужен для навигации/аутентификации
import { AppHeader } from '@/widgets/Header'

// 🔥 Если используете Geist — раскомментируйте:
// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
// 🔥 Или если используете Inter/Roboto (как в A6.2):
// import '@fontsource-variable/inter'
// import '@fontsource-variable/roboto'
import './globals.css'

export const metadata: Metadata = {
  // 🔥 Берём расширенную метадату из A6.2
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
    // 🔥 lang="ru" оставляем из вашей ветки (если приложение на русском)
    <html lang={"ru"} className={"h-full antialiased"}>
      {/* 🔥 flex flex-col оставляем, если нужен вертикальный флекс-лейаут */}
      <body className={"min-h-full flex flex-col"}>
        <ApolloAppProvider>
          {/* 🔥 AppHeader из A6.2 — обязателен, если в приложении есть хедер */}
          <AppHeader />
          {children}
        </ApolloAppProvider>
      </body>
    </html>
  )
}