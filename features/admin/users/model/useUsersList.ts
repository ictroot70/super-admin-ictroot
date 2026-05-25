'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetUsersDocument,
  type GetUsersQuery,
  type GetUsersQueryVariables,
  type SortDirection,
  type UserBlockStatus,
} from '@/shared/api/graphql/gql/graphql'
import { APP_ROUTES } from '@/shared/constant'
import { useDebounce, usePagination, useSort } from '@/shared/hooks'
import { formatDate } from '@/shared/lib'

import { FilterValue, UsersSortBy, UsersViewModel } from '.'

const SORT_DESC: SortDirection = 'desc'

export function useUsersList() {
  const { page: pageNumber, pageSize, onPageChange, onPageSizeChange, resetPage } = usePagination()
  const { sort, onSort } = useSort<UsersSortBy>({
    initialKey: UsersSortBy.CREATED_AT,
    initialDirection: SORT_DESC,
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<FilterValue>('ALL')

  const debouncedSearch = useDebounce(searchTerm, 500)

  const prevFiltersRef = useRef({ debouncedSearch, statusFilter, pageSize })

  useEffect(() => {
    const prev = prevFiltersRef.current
    const hasChanges =
      prev.debouncedSearch !== debouncedSearch ||
      prev.statusFilter !== statusFilter ||
      prev.pageSize !== pageSize

    if (hasChanges) {
      resetPage()
    }
    prevFiltersRef.current = { debouncedSearch, statusFilter, pageSize }
  }, [debouncedSearch, statusFilter, pageSize, resetPage])

  const variables: GetUsersQueryVariables = useMemo(() => {
    const vars: GetUsersQueryVariables = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      statusFilter: statusFilter as UserBlockStatus,
    }

    if (sort.key && sort.direction) {
      vars.sortBy = sort.key
      vars.sortDirection = sort.direction
    }

    const trimmedSearch = debouncedSearch.trim()

    if (trimmedSearch) {
      vars.searchTerm = trimmedSearch
    }

    return vars
  }, [pageNumber, pageSize, debouncedSearch, sort.key, sort.direction, statusFilter])

  const { data, previousData, loading, error, refetch } = useGqlQuery<
    GetUsersQuery,
    GetUsersQueryVariables
  >(GetUsersDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const resolvedData = data ?? previousData
  const isInitialLoading = loading && !resolvedData
  const isFetching = loading && Boolean(resolvedData)

  const usersData = resolvedData?.getUsers

  const items: UsersViewModel[] = useMemo(() => {
    if (!usersData?.users) return []

    return usersData.users.map(user => {
      const userId = user.id ?? 0
      const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(' ')

      return {
        userId,
        username: fullName || 'Unknown',
        profileLink: user.userName ?? 'Unknown',
        profileUrl: APP_ROUTES.USERS.ID(userId),
        dateAdded: formatDate(user.createdAt),
        isBlocked: Boolean(user.userBan),
      }
    })
  }, [usersData])

  const totalCount = usersData?.pagination?.totalCount ?? 0
  const pagesCount = usersData?.pagination?.pagesCount ?? 1
  const currentPage = usersData?.pagination?.page ?? pageNumber
  const currentPageSize = usersData?.pagination?.pageSize ?? pageSize

  const hasActiveFilters = useMemo(() => {
    return debouncedSearch.trim().length > 0 || statusFilter !== 'ALL'
  }, [debouncedSearch, statusFilter])

  const handleSort = useCallback(
    (key: UsersSortBy) => {
      resetPage()
      onSort(key)
    },
    [onSort, resetPage]
  )

  const handlePageChange = useCallback(
    (newPage: number) => {
      onPageChange(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [onPageChange]
  )

  const handleItemsPerPageChange = useCallback(
    (newPageSize: number) => {
      onPageSizeChange(newPageSize)
    },
    [onPageSizeChange]
  )

  const handleClearFilters = useCallback(() => {
    setSearchTerm('')
    setStatusFilter('ALL')
  }, [])

  return {
    users: {
      data: {
        items,
        page: currentPage,
        pageSize: currentPageSize,
        totalCount,
        totalPages: pagesCount,
        hasActiveFilters,
      },
      isInitialLoading,
      isFetching,
      isError: !!error,
    },
    sort,
    searchTerm,
    filterStatus: statusFilter,
    handleSort,
    handlePageChange,
    handleItemsPerPageChange,
    handleClearFilters,
    setSearchTerm,
    setFilterStatus: setStatusFilter,
    refetch,
  }
}
