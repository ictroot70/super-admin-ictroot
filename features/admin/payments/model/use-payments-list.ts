'use client'

import { useState } from 'react'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetPaymentsDocument,
  type GetPaymentsQuery,
  type GetPaymentsQueryVariables,
  type SortDirection,
} from '@/shared/api/graphql/gql/graphql'

type PaymentsSortBy = 'createdAt' | 'amount' | 'paymentMethod' | 'userName'

export function usePaymentsList() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTermState] = useState('')
  const [sortBy, setSortBy] = useState<PaymentsSortBy>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const { data, loading, error, refetch } = useGqlQuery<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >(GetPaymentsDocument, {
    variables: {
      pageNumber: page,
      pageSize: 6,
      searchTerm: searchTerm.trim() || undefined,
      sortBy,
      sortDirection,
    },
    fetchPolicy: 'cache-and-network',
  })

  const items =
    data?.getPayments.items.map(item => ({
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
    setSearchTermState(value)
    setPage(1)
  }

  const handleSort = (field: PaymentsSortBy) => {
    setPage(1)

    if (field === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')

      return
    }

    setSortBy(field)
    setSortDirection('asc')
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return {
    payments: {
      items,
      page: data?.getPayments.page ?? 1,
      pageSize: data?.getPayments.pageSize ?? 6,
      totalCount: data?.getPayments.totalCount ?? 0,
      totalPages: data?.getPayments.pagesCount ?? 1,
      isLoading: loading,
      isError: Boolean(error),
    },
    searchTerm,
    sortBy,
    sortDirection,
    setSearchTerm,
    handleSort,
    handlePageChange,
    refetch,
  }
}
