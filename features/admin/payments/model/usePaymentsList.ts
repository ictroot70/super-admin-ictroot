'use client'

import { useState } from 'react'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetPaymentsDocument,
  type GetPaymentsQuery,
  type GetPaymentsQueryVariables,
  SortDirection,
} from '@/shared/api/graphql/gql/graphql'
import { useDebounce, usePagination, useSort } from '@/shared/hooks'

const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
} as const satisfies Record<string, SortDirection>

type PaymentsSortBy = 'createdAt' | 'amount' | 'paymentMethod' | 'userName'

export function usePaymentsList() {
  const { page, pageSize, onPageChange, onPageSizeChange, resetPage } = usePagination()
  const { sort, onSort } = useSort<PaymentsSortBy>({
    initialKey: 'createdAt',
    initialDirection: SORT_DIRECTION.DESC,
  })
  const [rawSearchTerm, setRawSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(rawSearchTerm, 400)

  const { data, previousData, loading, error, refetch } = useGqlQuery<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >(GetPaymentsDocument, {
    variables: {
      pageNumber: page,
      pageSize,
      searchTerm: debouncedSearchTerm.trim() || undefined,
      sortBy: sort.key ?? undefined,
      sortDirection: sort.direction ?? undefined,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const resolvedData = data ?? previousData

  const items =
    resolvedData?.getPayments.items.map(item => ({
      id: item.id,
      userId: item.userId,
      userName: item.userName,
      amount: item.amount,
      currency: item.currency,
      paymentMethod: item.paymentMethod,
      createdAt: item.createdAt,
      endDate: item.endDate,
      type: item.type,
      avatars: item.avatars,
    })) ?? []

  const setSearchTerm = (value: string) => {
    setRawSearchTerm(value)
    resetPage()
  }

  const handleSort = (field: PaymentsSortBy) => {
    resetPage()
    onSort(field)
  }

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    onPageSizeChange(newPageSize)
  }

  return {
    payments: {
      items,
      page: resolvedData?.getPayments.page ?? 1,
      pageSize: resolvedData?.getPayments.pageSize ?? pageSize,
      totalCount: resolvedData?.getPayments.totalCount ?? 0,
      totalPages: resolvedData?.getPayments.pagesCount ?? 1,
      isLoading: loading,
      isError: Boolean(error),
    },
    searchTerm: rawSearchTerm,
    sortBy: sort.key,
    sortDirection: sort.direction,
    setSearchTerm,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    refetch,
  }
}
