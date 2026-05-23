'use client'

import { useEffect, useState } from 'react'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetPaymentsDocument,
  type GetPaymentsQuery,
  type GetPaymentsQueryVariables,
  SortDirection,
} from '@/shared/api/graphql/gql/graphql'
import { DEFAULT_PAGE_SIZE } from '@/shared/constant'

const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
} as const satisfies Record<string, SortDirection>

type PaymentsSortBy = 'createdAt' | 'amount' | 'paymentMethod' | 'userName'

export function usePaymentsList() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [rawSearchTerm, setRawSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<PaymentsSortBy>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SORT_DIRECTION.DESC)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchTerm(rawSearchTerm)
    }, 400)

    return () => window.clearTimeout(timeoutId)
  }, [rawSearchTerm])

  const { data, previousData, loading, error, refetch } = useGqlQuery<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >(GetPaymentsDocument, {
    variables: {
      pageNumber: page,
      pageSize,
      searchTerm: debouncedSearchTerm.trim() || undefined,
      sortBy,
      sortDirection,
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
    setPage(1)
  }

  const handleSort = (field: PaymentsSortBy) => {
    setPage(1)

    if (field === sortBy) {
      setSortDirection(
        sortDirection === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC
      )

      return
    }

    setSortBy(field)
    setSortDirection(SORT_DIRECTION.ASC)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setPage(1)
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
    sortBy,
    sortDirection,
    setSearchTerm,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    refetch,
  }
}
