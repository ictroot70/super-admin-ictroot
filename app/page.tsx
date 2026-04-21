// app/page.tsx
'use client'
import { UsersTable } from "@/features/admin/users/ui/users-table"

// 🔹 Обязательно: используем хуки и клиентские компоненты


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-16 px-4 sm:items-start">

        {/* 🔹 Заголовок страницы */}
        <div className="w-full mb-8">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            👥 Управление пользователями
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Поиск, фильтрация и пагинация списка пользователей
          </p>
        </div>

        {/* 🔹 Таблица пользователей (наш компонент) */}
        <div className="w-full">
          <UsersTable />
        </div>

      </main>
    </div>
  )
}