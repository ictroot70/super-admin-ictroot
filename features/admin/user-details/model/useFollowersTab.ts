'use client'

import { NetworkStatus } from '@apollo/client'
import { notFound, useParams } from 'next/navigation'
import { useMemo } from 'react'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetFollowersDocument,
  type GetFollowersQuery,
  type GetFollowersQueryVariables,
} from '@/shared/api/graphql/gql/graphql'
import { parseUserIdParam } from '@/shared/lib/route-params'

import { PAGE_SIZE_OPTIONS } from '../lib'
import { type FollowersSortBy } from '../lib/followersTabTypes.type'
import { usePagination } from './common/usePagination'
import { useSort } from './common/useSort'

export const useFollowersTab = () => {
  const { userId: userIdParam } = useParams<{ userId: string }>()
  const userId = parseUserIdParam(userIdParam)

  const { sort, onSort } = useSort<FollowersSortBy>()
  const { page, pageSize, onPageChange, onPageSizeChange, resetPage } = usePagination()

  const handleSort = (key: FollowersSortBy) => {
    resetPage()
    onSort(key)
  }

  if (!userId) {
    notFound()
  }

  const variables = useMemo<GetFollowersQueryVariables>(
    () => ({
      userId,
      pageNumber: page,
      pageSize,
      sortBy: sort.key,
      sortDirection: sort.direction,
    }),
    [userId, page, pageSize, sort]
  )

  const { data, previousData, loading, error, networkStatus } = useGqlQuery<
    GetFollowersQuery,
    GetFollowersQueryVariables
  >(GetFollowersDocument, {
    variables,
    skip: !userId,
    notifyOnNetworkStatusChange: true,
  })

  const followers = data?.getFollowers ??
    previousData?.getFollowers ?? {
      page,
      pageSize,
      totalCount: 0,
      items: [],
    }

  const isLoading = loading && !data && !previousData
  const isRefreshing =
    networkStatus === NetworkStatus.setVariables || networkStatus === NetworkStatus.refetch

  return {
    items: followers.items,
    sort,
    error,
    isLoading,
    isRefreshing,
    paginationProps: {
      currentPage: followers.page,
      totalItems: followers.totalCount,
      itemsPerPage: followers.pageSize,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      onPageChange,
      onItemsPerPageChange: onPageSizeChange,
    },
    onSort: handleSort,
  }
}
