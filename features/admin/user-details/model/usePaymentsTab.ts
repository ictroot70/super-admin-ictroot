'use client'

import { NetworkStatus } from '@apollo/client'
import { notFound, useParams } from 'next/navigation'
import { useMemo } from 'react'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetPaymentsByUserDocument,
  type GetPaymentsByUserQuery,
  type GetPaymentsByUserQueryVariables,
} from '@/shared/api/graphql/gql/graphql'
import { parseUserIdParam } from '@/shared/lib/route-params'

import { PAGE_SIZE_OPTIONS } from '../lib'
import { type PaymentsSortBy } from '../lib/paymentsTabTypes.type'
import { usePagination } from './common/usePagination'
import { useSort } from './common/useSort'

export const usePaymentsTab = () => {
  const { userId: userIdParam } = useParams<{ userId: string }>()
  const userId = parseUserIdParam(userIdParam)

  const { sort, onSort } = useSort<PaymentsSortBy>()
  const { page, pageSize, onPageChange, onPageSizeChange, resetPage } = usePagination()

  const handleSort = (key: PaymentsSortBy) => {
    resetPage()
    onSort(key)
  }

  if (!userId) {
    notFound()
  }

  const variables = useMemo<GetPaymentsByUserQueryVariables>(
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
    GetPaymentsByUserQuery,
    GetPaymentsByUserQueryVariables
  >(GetPaymentsByUserDocument, {
    variables,
    skip: !userId,
    notifyOnNetworkStatusChange: true,
  })

  const payments = data?.getPaymentsByUser ??
    previousData?.getPaymentsByUser ?? {
      page,
      pageSize,
      totalCount: 0,
      items: [],
    }

  const isLoading = loading && !data && !previousData
  const isRefreshing =
    networkStatus === NetworkStatus.setVariables || networkStatus === NetworkStatus.refetch

  return {
    items: payments.items,
    sort,
    error,
    isLoading,
    isRefreshing,
    paginationProps: {
      currentPage: payments.page,
      totalItems: payments.totalCount,
      itemsPerPage: payments.pageSize,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      onPageChange,
      onItemsPerPageChange: onPageSizeChange,
    },
    onSort: handleSort,
  }
}
