// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/apollo/apollo-provider";

// 🔹 1. Импортируем наш ApolloProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Super Admin",
  description: "Admin panel for user management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html
      lang="ru" // 🔹 2. Поменяли на "ru" (опционально)
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 🔹 3. ОБЯЗАТЕЛЬНО: оборачиваем children в Providers */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}