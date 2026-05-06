'use client'

import { NetworkStatus } from '@apollo/client'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetPaymentsByUserDocument,
  type GetPaymentsByUserQuery,
  type GetPaymentsByUserQueryVariables,
} from '@/shared/api/graphql/gql/graphql'
import { PAGE_SIZE_OPTIONS } from '@/shared/constant'
import { usePagination } from '@/shared/lib/pagination'
import { parseUserIdParam } from '@/shared/lib/route-params'
import { useSort } from '@/shared/lib/sorting/useSort'

import { type PaymentsSortBy } from '../types/paymentsTab.type'

export const usePaymentsTab = () => {
  const { userId: userIdParam } = useParams<{ userId: string }>()
  const userId = parseUserIdParam(userIdParam)
  const safeUserId = userId ?? 0

  const { sort, onSort } = useSort<PaymentsSortBy>()
  const { page, pageSize, onPageChange, onPageSizeChange, resetPage } = usePagination()

  const handleSort = (key: PaymentsSortBy) => {
    resetPage()
    onSort(key)
  }

  const variables = useMemo<GetPaymentsByUserQueryVariables>(
    () => ({
      userId: safeUserId,
      pageNumber: page,
      pageSize,
      sortBy: sort.key,
      sortDirection: sort.direction,
    }),
    [safeUserId, page, pageSize, sort]
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

  const normalizedItems = payments.items.map(item => {
    const primaryPayment = item.payments?.[0] ?? null

    return {
      ...item,
      dateOfPayment: primaryPayment?.createdAt ?? item.dateOfPayment ?? null,
      endDate: primaryPayment?.endDate ?? item.endDate ?? null,
      price: primaryPayment?.amount ?? item.price ?? null,
      type: primaryPayment?.type ?? item.type ?? null,
      paymentType: primaryPayment?.paymentMethod ?? item.paymentType ?? null,
    }
  })

  return {
    items: normalizedItems,
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
