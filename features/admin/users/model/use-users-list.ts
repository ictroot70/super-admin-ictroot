'use client' // 🔹 Обязательно для Next.js App Router

import { useState, useEffect, useMemo } from 'react'
import { GET_USERS, UserListItem, FilterValue, SortValue } from './graphql'
import { useDebounce } from '../utils/useDebounce'
import { useQuery } from '@apollo/client/react'

interface UseUsersListReturn {
  users: UserListItem[]
  loading: boolean
  error: Error | null
  pagination: { page: number; pageSize: number; totalPages: number; totalCount: number }
  filters: { searchTerm: string; sort: SortValue; filter: FilterValue }
  handlers: {
    setSearchTerm: (v: string) => void
    setSort: (v: SortValue) => void
    setFilter: (v: FilterValue) => void
    setPage: (v: number) => void
    refetch: () => void
  }
}

export const useUsersList = (): UseUsersListReturn => {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(8)
  const [searchTerm, setSearchTerm] = useState('')
  const [sort, setSort] = useState<SortValue>('createdAt_desc')
  const [filter, setFilter] = useState<FilterValue>('ALL')

  // 🔹 Debounce поиска
  const debouncedSearch = useDebounce(searchTerm, 500)

  // 🔹 Сброс страницы при изменении фильтров
  useEffect(() => {
    setPageNumber(1)
  }, [debouncedSearch, sort, filter])

  // 🔹 Переменные для GraphQL
  const variables = useMemo(
    () => ({
      page: pageNumber,
      pageSize,
      search: debouncedSearch.trim() || undefined,
      sort,
      filter: filter === 'ALL' ? undefined : filter,
    }),
    [pageNumber, pageSize, debouncedSearch, sort, filter]
  )

  const { data, loading, error, refetch } = useQuery(GET_USERS, {
    variables,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  })

  const users = data?.users?.items || []
  const totalCount = data?.users?.totalCount || 0
  // 🔹 Исправление: totalPages не может быть 0
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 1

  return {
    users,
    loading,
    error,
    pagination: { page: pageNumber, pageSize, totalPages, totalCount },
    filters: { searchTerm, sort, filter },
    handlers: {
      setSearchTerm,
      setSort,
      setFilter,
      setPage: setPageNumber,
      refetch,
    },
  }
}