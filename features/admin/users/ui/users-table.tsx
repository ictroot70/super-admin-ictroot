// features/admin/users/ui/users-table.tsx
'use client'

import { useUsersList } from '../model/use-users-list'
import type { SortValue, FilterValue } from '../model/graphql'

export const UsersTable = () => {
    const { users, loading, error, pagination, filters, handlers } = useUsersList()

    if (error) {
        return (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700">
                ❌ Ошибка: {error.message}
                <button onClick={() => handlers.refetch()} className="ml-2 underline">
                    Повторить
                </button>
            </div>
        )
    }

    return (
        <div className="w-full space-y-4">
            {/* 🔍 Поиск и фильтры */}
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="search"
                    placeholder="Поиск по имени или email..."
                    value={filters.searchTerm}
                    onChange={(e) => handlers.setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                />

                <select
                    value={filters.filter}
                    onChange={(e) => handlers.setFilter(e.target.value as FilterValue)}
                    className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                >
                    <option value="ALL">Все</option>
                    <option value="UNBLOCKED">Активные</option>
                    <option value="BLOCKED">Заблокированные</option>
                </select>

                <select
                    value={filters.sort}
                    onChange={(e) => handlers.setSort(e.target.value as SortValue)}
                    className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                >
                    <option value="createdAt_desc">Новые сначала</option>
                    <option value="createdAt_asc">Старые сначала</option>
                    <option value="userName_asc">По имени (А-Я)</option>
                    <option value="userName_desc">По имени (Я-А)</option>
                </select>
            </div>

            {/* 📊 Таблица */}
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm">
                    <thead className="bg-zinc-100 dark:bg-zinc-900">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">ID</th>
                            <th className="px-4 py-3 text-left font-medium">Имя</th>
                            <th className="px-4 py-3 text-left font-medium">Email</th>
                            <th className="px-4 py-3 text-left font-medium">Статус</th>
                            <th className="px-4 py-3 text-left font-medium">Дата</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {loading && users.length === 0 ? (
                            <tr><td colSpan={5} className="px-4 py-8 text-center text-zinc-500">Загрузка...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={5} className="px-4 py-8 text-center text-zinc-500">Пользователи не найдены</td></tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                    <td className="px-4 py-3 font-mono text-zinc-500">{user.id}</td>
                                    <td className="px-4 py-3 font-medium">
                                        {user.firstName || user.lastName
                                            ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                                            : user.userName}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{user.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.isBlocked
                                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                            }`}>
                                            {user.isBlocked ? 'Заблокирован' : 'Активен'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-zinc-500">
                                        {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* 📄 Пагинация */}
            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-zinc-500">
                        Стр. {pagination.page} из {pagination.totalPages} • Всего: {pagination.totalCount}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlers.setPage(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        >
                            ← Назад
                        </button>
                        <button
                            onClick={() => handlers.setPage(pagination.page + 1)}
                            disabled={pagination.page === pagination.totalPages}
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        >
                            Далее →
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}