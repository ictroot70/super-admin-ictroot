'use client'

import { useMemo, useState } from 'react'

import { Pagination } from '@/shared/ui'

import { payments } from './payments-mock'
import { PaymentsSortBy, PaymentsSortDirection, PaymentsSortState } from './payments-tab.type'
import { PaymentsTableTab } from './payments-table-tab'

export const DEFAULT_PAYMENTS_PAGE_NUMBER = 1
export const PAYMENTS_PAGE_SIZE_OPTIONS = [8, 12, 16, 20]
export const DEFAULT_PAYMENTS_PAGE_SIZE = PAYMENTS_PAGE_SIZE_OPTIONS[1]

export function PaymentsTab() {
  const [sort, setSort] = useState<PaymentsSortState>({
    key: null,
    direction: null,
  })
  const [page, setPage] = useState(DEFAULT_PAYMENTS_PAGE_NUMBER)
  const [pageSize, setPageSize] = useState(DEFAULT_PAYMENTS_PAGE_SIZE)

  const sortedPayments = useMemo(() => {
    if (!sort.key || !sort.direction) {
      return payments
    }

    const sorted = [...payments].sort((a, b) => {
      const directionMultiplier = sort.direction === PaymentsSortDirection.ASC ? 1 : -1

      switch (sort.key) {
        case PaymentsSortBy.DATE_OF_PAYMENT: {
          return (
            (new Date(a.dateOfPayment).getTime() - new Date(b.dateOfPayment).getTime()) *
            directionMultiplier
          )
        }

        case PaymentsSortBy.END_DATE: {
          return (
            (new Date(a.endDateOfSubscription).getTime() -
              new Date(b.endDateOfSubscription).getTime()) *
            directionMultiplier
          )
        }

        case PaymentsSortBy.PRICE: {
          return (a.price - b.price) * directionMultiplier
        }

        case PaymentsSortBy.PAYMENT_TYPE: {
          return a.paymentType.localeCompare(b.paymentType) * directionMultiplier
        }

        default:
          return 0
      }
    })

    return sorted
  }, [sort])

  const totalCount = payments.length

  const paginatedPayments = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize

    return sortedPayments.slice(startIndex, endIndex)
  }, [page, pageSize, sortedPayments])

  const handleSort = (key: PaymentsSortBy) => {
    if (sort.key !== key) {
      setSort({ key, direction: PaymentsSortDirection.ASC })
      setPage(DEFAULT_PAYMENTS_PAGE_NUMBER)

      return
    }

    if (sort.direction === PaymentsSortDirection.ASC) {
      setSort({ key, direction: PaymentsSortDirection.DESC })
      setPage(DEFAULT_PAYMENTS_PAGE_NUMBER)

      return
    }

    setSort({ key: null, direction: null })
    setPage(DEFAULT_PAYMENTS_PAGE_NUMBER)
  }

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
  }

  const handleItemsPerPageChange = (nextPageSize: number) => {
    setPageSize(nextPageSize)
    setPage(DEFAULT_PAYMENTS_PAGE_NUMBER)
  }

  return (
    <div
      className={
        'relative grid h-[calc(100vh-220px)] min-h-full grid-rows-[minmax(0,1fr)_auto] gap-9 overflow-hidden py-6'
      }
    >
      <PaymentsTableTab items={paginatedPayments} sort={sort} onSort={handleSort} />
      <Pagination
        currentPage={page}
        totalItems={totalCount}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        pageSizeOptions={PAYMENTS_PAGE_SIZE_OPTIONS}
      />
    </div>
  )
}
