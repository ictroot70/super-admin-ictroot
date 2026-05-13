'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetUsersDocument,
  GetUsersQuery,
  GetUsersQueryVariables,
  SortDirection,
  UserBlockStatus,
} from '@/shared/api/graphql/gql/graphql'

import { FilterValue, SortValue, UsersSortBy, UsersSortState, UsersViewModel } from '.'
import { useDebounce } from '../utils/useDebounce'

function normalizeSort(sortValue: SortValue): { sortBy: string; sortDirection: SortDirection } {
  const [field, direction] = sortValue.split('_') as [UsersSortBy, SortDirection]
  const sortBy = field === UsersSortBy.USER_NAME ? 'userName' : field

  return { sortBy, sortDirection: direction }
}

export function useUsersList() {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortValue, setSortValue] = useState<SortValue>('createdAt_desc')
  const [statusFilter, setStatusFilter] = useState<FilterValue>('ALL')

  const debouncedSearch = useDebounce(searchTerm, 300)

  const prevFiltersRef = useRef({ debouncedSearch, sortValue, statusFilter, pageSize })

  useEffect(() => {
    const prev = prevFiltersRef.current
    const hasChanges =
      prev.debouncedSearch !== debouncedSearch ||
      prev.sortValue !== sortValue ||
      prev.statusFilter !== statusFilter ||
      prev.pageSize !== pageSize

    if (hasChanges) {
      setPageNumber(1)
    }
    prevFiltersRef.current = { debouncedSearch, sortValue, statusFilter, pageSize }
  }, [debouncedSearch, sortValue, statusFilter, pageSize])

  const { sortBy, sortDirection } = useMemo(() => normalizeSort(sortValue), [sortValue])

  const variables: GetUsersQueryVariables = useMemo(() => {
    const vars: GetUsersQueryVariables = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortBy: sortBy,
      sortDirection: sortDirection,
      statusFilter: statusFilter as UserBlockStatus,
    }

    const trimmedSearch = debouncedSearch.trim()

    if (trimmedSearch) {
      vars.searchTerm = trimmedSearch
    }

    return vars
  }, [pageNumber, pageSize, debouncedSearch, sortBy, sortDirection, statusFilter])

  const { data, loading, error, refetch } = useGqlQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    {
      variables,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    }
  )

  const [hasEverReceivedData, setHasEverReceivedData] = useState(false)
  const hasSetDataRef = useRef(false)

  useEffect(() => {
    if (data?.getUsers?.users?.length && !hasSetDataRef.current) {
      hasSetDataRef.current = true
      setHasEverReceivedData(true)
    }
  }, [data])

  const isInitialLoading = loading && !hasEverReceivedData
  const isFetching = loading && hasEverReceivedData

  const usersData = data?.getUsers

  const items: UsersViewModel[] = useMemo(() => {
    if (!usersData?.users) return []

    return usersData.users.map(user => ({
      userId: user.id ?? 0,
      username: user.userName ?? 'Unknown',
      email: user.email ?? '',
      profileLink: `/profile/${user.userName ?? 'unknown'}`,
      dateAdded: new Date(user.createdAt).toLocaleDateString('ru-RU'),
      isBlocked: Boolean(user.userBan),
    }))
  }, [usersData])

  const totalCount = usersData?.pagination?.totalCount ?? 0
  const pagesCount = usersData?.pagination?.pagesCount ?? 1
  const currentPage = usersData?.pagination?.page ?? pageNumber
  const currentPageSize = usersData?.pagination?.pageSize ?? pageSize

  const hasActiveFilters = useMemo(() => {
    return debouncedSearch.trim().length > 0 || statusFilter !== 'ALL'
  }, [debouncedSearch, statusFilter])

  const sort: UsersSortState = useMemo(
    () => ({
      key: sortBy as UsersSortBy,
      direction: sortDirection,
    }),
    [sortBy, sortDirection]
  )

  const handleSort = useCallback(
    (key: UsersSortBy) => {
      setSortValue(prev => {
        const [currentField] = prev.split('_')
        const isSameField = currentField === key
        const newDirection: SortDirection =
          isSameField && sortDirection === SortDirection.Asc
            ? SortDirection.Desc
            : SortDirection.Asc

        return `${key}_${newDirection}` as SortValue
      })
    },
    [sortDirection]
  )

  const handlePageChange = useCallback((newPage: number) => {
    setPageNumber(newPage)
  }, [])

  const handleItemsPerPageChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize)
  }, [])

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
