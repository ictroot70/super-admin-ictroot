'use client'

import { NetworkStatus } from '@apollo/client'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { notFound, useParams } from 'next/navigation'
import { useMemo } from 'react'

import { useGqlQuery } from '@/shared/api/graphql'
import { type SortDirection } from '@/shared/api/graphql/gql/graphql'
import { PAGE_SIZE_OPTIONS } from '@/shared/constant'
import { usePagination } from '@/shared/lib/pagination'
import { parseUserIdParam } from '@/shared/lib/route-params'
import { useSort } from '@/shared/lib/sorting/useSort'

import { type UserRelationshipsConnection, type UserRelationshipsSortBy } from '../types'

type UserRelationshipsQueryVariables = {
  userId: number
  pageNumber: number
  pageSize: number
  sortBy?: string | null
  sortDirection?: SortDirection | null
}

type UseUserRelationshipsTabOptions<TQuery, TVariables extends UserRelationshipsQueryVariables> = {
  document: DocumentNode<TQuery, TVariables>
  selectConnection: (data: TQuery) => UserRelationshipsConnection | undefined
}

export const useUserRelationshipsTab = <
  TQuery,
  TVariables extends UserRelationshipsQueryVariables,
>({
  document,
  selectConnection,
}: UseUserRelationshipsTabOptions<TQuery, TVariables>) => {
  const { userId: userIdParam } = useParams<{ userId: string }>()
  const userId = parseUserIdParam(userIdParam)

  const { sort, onSort } = useSort<UserRelationshipsSortBy>()
  const { page, pageSize, onPageChange, onPageSizeChange, resetPage } = usePagination()

  const handleSort = (key: UserRelationshipsSortBy) => {
    resetPage()
    onSort(key)
  }

  if (!userId) {
    notFound()
  }

  const variables = useMemo<TVariables>(
    () =>
      ({
        userId,
        pageNumber: page,
        pageSize,
        sortBy: sort.key,
        sortDirection: sort.direction,
      }) as TVariables,
    [userId, page, pageSize, sort.key, sort.direction]
  )

  const { data, previousData, loading, error, networkStatus } = useGqlQuery<TQuery, TVariables>(
    document,
    {
      variables,
      skip: !userId,
      notifyOnNetworkStatusChange: true,
    }
  )

  const relationships =
    (data && selectConnection(data)) || (previousData && selectConnection(previousData))

  const isLoading = loading && !data && !previousData
  const isRefreshing =
    networkStatus === NetworkStatus.setVariables || networkStatus === NetworkStatus.refetch

  return {
    items: relationships?.items ?? [],
    sort,
    error,
    isLoading,
    isRefreshing,
    paginationProps: {
      currentPage: relationships?.page ?? page,
      totalItems: relationships?.totalCount ?? 0,
      itemsPerPage: relationships?.pageSize ?? pageSize,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      onPageChange,
      onItemsPerPageChange: onPageSizeChange,
    },
    onSort: handleSort,
  }
}
