
// 'use client'

// import { useState, useEffect, useMemo, useCallback } from 'react'
// import { useQuery } from '@apollo/client/react'
// import { useDebounce } from '../utils/useDebounce'
// import { SortValue, FilterValue, UsersSortBy, UsersSortState } from '.'
// import { SortDirection, GET_USERS, UserListItem } from './graphql'

// export interface UsersViewModel {
//   userId: number
//   username: string
//   email: string
//   profileLink: string
//   dateAdded: string
//   isBlocked: boolean
// }

// export interface UsersDataResponse {
//   items: UsersViewModel[]
//   page: number
//   pageSize: number
//   totalCount: number
//   totalPages: number
//   hasActiveFilters: boolean
// }

// export function useUsersList() {
//   const [page, setPage] = useState(1)
//   const [pageSize, setPageSize] = useState(8)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [sortValue, setSortValue] = useState<SortValue>('createdAt_desc')
//   const [filterStatus, setFilterStatus] = useState<FilterValue>('ALL')

//   const debouncedSearch = useDebounce(searchTerm, 500)

//   useEffect(() => {
//     setPage(1)
//   }, [debouncedSearch, sortValue, filterStatus, pageSize])

//   const [sortField, sortDirection] = useMemo(() => {
//     const [field, direction] = sortValue.split('_') as [UsersSortBy, SortDirection]
//     const mappedField = field === UsersSortBy.USER_NAME ? 'userName' : field
//     return [mappedField, direction]
//   }, [sortValue])

//   const variables = useMemo(() => ({
//     pageNumber: page,
//     pageSize,
//     searchTerm: debouncedSearch.trim() || undefined,
//     sortBy: sortField,
//     sortDirection,
//   }), [page, pageSize, debouncedSearch, sortField, sortDirection])

//   const { data, loading, error, refetch } = useQuery(GET_USERS, {
//     variables,
//     fetchPolicy: 'cache-and-network',
//   })

//   const { items, hasActiveFilters, serverSearchUsed } = useMemo(() => {
//     const rawUsers = data?.getUsers?.users || []
//     const searchTrimmed = debouncedSearch.trim().toLowerCase()

//     const serverSearchUsed = !!searchTrimmed && !!data?.getUsers?.users

//     const byStatus = rawUsers.filter((user: UserListItem) => {
//       const isBlocked = user.userBan !== null && user.userBan !== undefined
//       if (filterStatus === 'ALL') return true
//       return filterStatus === 'BLOCKED' ? isBlocked : !isBlocked
//     })

//     // Клиентский поиск по email/username (фолбэк)
//     const filtered = searchTrimmed
//       ? byStatus.filter((user: UserListItem) => {
//         const emailMatch = user.email?.toLowerCase().includes(searchTrimmed)
//         const usernameMatch = user.userName?.toLowerCase().includes(searchTrimmed)
//         return emailMatch || usernameMatch
//       })
//       : byStatus

//     const viewModelItems = filtered.map((user: UserListItem): UsersViewModel => ({
//       userId: user.id,
//       username: user.userName,
//       email: user.email,
//       profileLink: `/profile/${user.userName}`,
//       dateAdded: user.createdAt,
//       isBlocked: user.userBan !== null,
//     }))

//     const hasActiveFilters = debouncedSearch.trim().length > 0 || filterStatus !== 'ALL'

//     return { items: viewModelItems, hasActiveFilters, serverSearchUsed }
//   }, [data, filterStatus, debouncedSearch])

//   const pagination = data?.getUsers?.pagination || { page: 1, pageSize: 8, totalCount: 0, pagesCount: 1 }
//   const totalPages = pagination.pagesCount > 0 ? pagination.pagesCount : 1

//   const sort: UsersSortState = useMemo(() => ({
//     key: sortField as UsersSortBy,
//     direction: sortDirection,
//   }), [sortField, sortDirection])

//   const handleSort = useCallback((key: UsersSortBy) => {
//     setSortValue((prev) => {
//       const [currentField] = prev.split('_')
//       const isSameField = currentField === key
//       const newDirection: SortDirection = isSameField && sortDirection === 'asc' ? 'desc' : 'asc'
//       return `${key}_${newDirection}`
//     })
//   }, [sortDirection])

//   const handlePageChange = useCallback((newPage: number) => {
//     setPage(newPage)
//   }, [])

//   const handleItemsPerPageChange = useCallback((newPageSize: number) => {
//     setPageSize(newPageSize)
//     setPage(1)
//   }, [])

//   const handleClearFilters = useCallback(() => {
//     setSearchTerm('')
//     setFilterStatus('ALL')
//     setPage(1)
//   }, [])

//   return {
//     users: {
//       data: items.length > 0 || !loading ? {
//         items,
//         page: pagination.page,
//         pageSize: pagination.pageSize,
//         totalCount: pagination.totalCount,
//         totalPages,
//         hasActiveFilters,
//       } : null,
//       isLoading: loading,
//       isError: !!error,
//     },
//     sort,
//     searchTerm,
//     filterStatus,
//     handleSort,
//     handlePageChange,
//     handleItemsPerPageChange,
//     handleClearFilters,
//     setSearchTerm,
//     setFilterStatus,
//     refetch,
//   }
// }

'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useQuery } from '@apollo/client/react'
import { useDebounce } from '../utils/useDebounce'
import { SortValue, FilterValue, UsersSortBy, UsersSortState } from '.'
import { SortDirection, GET_USERS, UserListItem } from './graphql'

export interface UsersViewModel {
  userId: number
  username: string
  email: string
  profileLink: string
  dateAdded: string
  isBlocked: boolean
}

export interface UsersDataResponse {
  items: UsersViewModel[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasActiveFilters: boolean
}

export function useUsersList() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortValue, setSortValue] = useState<SortValue>('createdAt_desc')
  const [filterStatus, setFilterStatus] = useState<FilterValue>('ALL')

  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, sortValue, filterStatus, pageSize])

  const [sortField, sortDirection] = useMemo(() => {
    const [field, direction] = sortValue.split('_') as [UsersSortBy, SortDirection]
    const mappedField = field === UsersSortBy.USER_NAME ? 'userName' : field
    return [mappedField, direction]
  }, [sortValue])

  const isEmailSearch = debouncedSearch.trim().includes('@')

  const variables = useMemo(() => ({
    pageNumber: page,
    pageSize: isEmailSearch ? 100 : pageSize,
    searchTerm: isEmailSearch ? undefined : debouncedSearch.trim() || undefined,
    sortBy: sortField,
    sortDirection,
  }), [page, pageSize, debouncedSearch, sortField, sortDirection, isEmailSearch])

  const { data, loading, error, refetch } = useQuery(GET_USERS, {
    variables,
    fetchPolicy: 'cache-and-network',
  })

  const { items, hasActiveFilters } = useMemo(() => {
    const rawUsers = data?.getUsers?.users || []
    const searchTrimmed = debouncedSearch.trim().toLowerCase()

    let filtered = rawUsers.filter((user: UserListItem) => {
      const isBlocked = user.userBan !== null && user.userBan !== undefined
      if (filterStatus === 'ALL') return true
      return filterStatus === 'BLOCKED' ? isBlocked : !isBlocked
    })

    if (searchTrimmed) {
      if (isEmailSearch) {
        filtered = filtered.filter((user: UserListItem) =>
          user.email?.toLowerCase().includes(searchTrimmed)
        )
      } else {
        filtered = filtered.filter((user: UserListItem) => {
          const emailMatch = user.email?.toLowerCase().includes(searchTrimmed)
          const usernameMatch = user.userName?.toLowerCase().includes(searchTrimmed)
          return emailMatch || usernameMatch
        })
      }
    }

    const viewModelItems = filtered.map((user: UserListItem): UsersViewModel => ({
      userId: user.id,
      username: user.userName,
      email: user.email,
      profileLink: `/profile/${user.userName}`,
      dateAdded: user.createdAt,
      isBlocked: user.userBan !== null,
    }))

    const hasActiveFilters = debouncedSearch.trim().length > 0 || filterStatus !== 'ALL'

    return { items: viewModelItems, hasActiveFilters }
  }, [data, filterStatus, debouncedSearch, isEmailSearch])

  const pagination = data?.getUsers?.pagination || { page: 1, pageSize: 8, totalCount: 0, pagesCount: 1 }
  const totalPages = pagination.pagesCount > 0 ? pagination.pagesCount : 1

  const sort: UsersSortState = useMemo(() => ({
    key: sortField as UsersSortBy,
    direction: sortDirection,
  }), [sortField, sortDirection])

  const handleSort = useCallback((key: UsersSortBy) => {
    setSortValue((prev) => {
      const [currentField] = prev.split('_')
      const isSameField = currentField === key
      const newDirection: SortDirection = isSameField && sortDirection === 'asc' ? 'desc' : 'asc'
      return `${key}_${newDirection}`
    })
  }, [sortDirection])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  const handleItemsPerPageChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize)
    setPage(1)
  }, [])

  const handleClearFilters = useCallback(() => {
    setSearchTerm('')
    setFilterStatus('ALL')
    setPage(1)
  }, [])

  return {
    users: {
      data: items.length > 0 || !loading ? {
        items,
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalCount: pagination.totalCount,
        totalPages,
        hasActiveFilters,
      } : null,
      isLoading: loading,
      isError: !!error,
    },
    sort,
    searchTerm,
    filterStatus,
    handleSort,
    handlePageChange,
    handleItemsPerPageChange,
    handleClearFilters,
    setSearchTerm,
    setFilterStatus,
    refetch,
  }
}