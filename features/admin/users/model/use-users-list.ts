// features/admin/users/model/use-users-list.ts
'use client'

import { useState, useEffect, useMemo } from 'react'
import { GET_USERS, UserListItem, FilterValue, SortValue, SortDirection } from './graphql'
import { useQuery } from '@apollo/client/react'
import { useDebounce } from '../utils/useDebounce'

export const useUsersList = () => {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(8)
  const [searchTerm, setSearchTerm] = useState('')
  const [sort, setSort] = useState<SortValue>('createdAt_desc')
  const [filter, setFilter] = useState<FilterValue>('ALL')

  const debouncedSearch = useDebounce(searchTerm, 500)

  // 🔹 Сброс страницы при изменении фильтров
  useEffect(() => setPage(1), [debouncedSearch, sort, filter])

  // 🔹 Маппинг переменных под схему
  const variables = useMemo(() => {
    const [field, direction] = sort.split('_') // 'createdAt_desc' → ['createdAt', 'desc']
    return {
      pageNumber: page,
      pageSize,
      searchTerm: debouncedSearch.trim() || undefined,
      sortBy: field === 'name' ? 'userName' : field, // маппим "name" → "userName"
      sortDirection: direction as SortDirection, // ✅ уже в нижнем регистре
    }
  }, [page, pageSize, debouncedSearch, sort])

  const { data, loading, error, refetch } = useQuery(GET_USERS, {
    variables,
    fetchPolicy: 'cache-and-network',
  })

  // 🔹 Безопасное извлечение данных
  const rawUsers = data?.getUsers?.users || []
  const pagination = data?.getUsers?.pagination || { page: 1, pageSize: 8, totalCount: 0, pagesCount: 1 }

  // 🔹 Клиентская фильтрация по статусу (если сервер не поддерживает)
  const filteredUsers = useMemo(() => {
    if (filter === 'ALL') return rawUsers
    return rawUsers.filter(user => {
      const isBlocked = user.userBan !== null
      return filter === 'BLOCKED' ? isBlocked : !isBlocked
    })
  }, [rawUsers, filter])

  // 🔹 Преобразуем в UserListItem с вычисляемым isBlocked
  const users: UserListItem[] = filteredUsers.map(user => ({
    id: user.id,
    userName: user.userName,
    email: user.email,
    createdAt: user.createdAt,
    firstName: user.profile?.firstName ?? null,
    lastName: user.profile?.lastName ?? null,
    isBlocked: user.userBan !== null, // ✅ Блокировка = наличие userBan
  }))

  const totalPages = pagination.pagesCount > 0 ? pagination.pagesCount : 1

  return {
    users,
    loading,
    error,
    pagination: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages,
      totalCount: pagination.totalCount,
    },
    filters: { searchTerm, sort, filter },
    handlers: {
      setSearchTerm,
      setSort,
      setFilter,
      setPage,
      refetch,
    },
  }
}