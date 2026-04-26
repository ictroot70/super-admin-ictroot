'use client'

import { useMemo, useState } from 'react'

import { Pagination } from '@/shared/ui'

import {
  DEFAULT_PAGE_NUMBER,
  handlePaginationItemsPerPageChange,
  handlePaginationPageChange,
  paginateItems,
} from '../../lib/table-pagination'
import { handleSortChange } from '../../lib/table-sorting'
import { PAGE_SIZE_OPTIONS, DEFAULT_PAGE_SIZE } from '../../model'
import { payments } from './payments-mock'
import { sortPayments } from './payments-tab-helpers'
import { PaymentsSortBy, PaymentsSortState } from './payments-tab.type'
import { PaymentsTableTab } from './payments-table-tab'

export function PaymentsTab() {
  const [sort, setSort] = useState<PaymentsSortState>({
    key: null,
    direction: null,
  })
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const sortedPayments = useMemo(() => sortPayments(payments, sort), [sort])

  const paginatedPayments = useMemo(() => {
    return paginateItems(sortedPayments, page, pageSize)
  }, [page, pageSize, sortedPayments])

  const handleSort = (key: PaymentsSortBy) => {
    handleSortChange({
      key,
      sort,
      setSort,
      resetPage: () => setPage(DEFAULT_PAGE_NUMBER),
    })
  }

  const handlePageChange = (nextPage: number) => {
    handlePaginationPageChange(nextPage, setPage)
  }

  const handleItemsPerPageChange = (nextPageSize: number) => {
    handlePaginationItemsPerPageChange({
      nextPageSize,
      setPageSize,
      setPage,
      defaultPage: DEFAULT_PAGE_NUMBER,
    })
  }

  return (
    <div
      className={
        'relative grid h-[calc(100vh-220px)] min-h-full grid-rows-[minmax(0,1fr)_auto] gap-4 overflow-hidden py-6'
      }
    >
      <PaymentsTableTab items={paginatedPayments} sort={sort} onSort={handleSort} />

      <Pagination
        currentPage={page}
        totalItems={sortedPayments.length}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  )
}
