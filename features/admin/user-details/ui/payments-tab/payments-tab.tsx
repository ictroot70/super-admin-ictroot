'use client'

import { useState } from 'react'

import { payments } from './payments-mock'
import { PaymentsSortBy, PaymentsSortDirection, PaymentsSortState } from './payments-tab.type'
import { PaymentsTableTab } from './payments-table-tab'

export const DEFAULT_PAYMENTS_PAGE_NUMBER = 1

export function PaymentsTab() {
  const [sort, setSort] = useState<PaymentsSortState>({
    key: null,
    direction: null,
  })
  const [, setPageNumber] = useState(DEFAULT_PAYMENTS_PAGE_NUMBER)

  const handleSort = (key: PaymentsSortBy) => {
    if (sort.key !== key) {
      setSort({ key, direction: PaymentsSortDirection.ASC })
      setPageNumber(DEFAULT_PAYMENTS_PAGE_NUMBER)

      return
    }

    if (sort.direction === PaymentsSortDirection.ASC) {
      setSort({ key, direction: PaymentsSortDirection.DESC })
      setPageNumber(DEFAULT_PAYMENTS_PAGE_NUMBER)

      return
    }

    setSort({ key: null, direction: null })
    setPageNumber(DEFAULT_PAYMENTS_PAGE_NUMBER)
  }

  return (
    <div
      className={
        'relative grid h-[calc(100vh-220px)] min-h-full grid-rows-[minmax(0,1fr)_auto] gap-4 overflow-hidden py-6'
      }
    >
      <PaymentsTableTab items={payments} sort={sort} onSort={handleSort} />
      {/* <Pagination
        currentPage={page}
        totalItems={totalCount}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        pageSizeOptions={PAYMENTS_PAGE_SIZE_OPTIONS}
      /> */}
    </div>
  )
}
