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
import { sortRelationshipUsers } from './relationship-tab-helpers'
import {
  RelationshipSortBy,
  RelationshipSortState,
  RelationshipUserViewModel,
} from './relationship-tab.type'
import { RelationshipTableTab } from './relationship-table-tab'

type Props = {
  items: RelationshipUserViewModel[]
}

export function RelationshipTabBase({ items }: Props) {
  const [sort, setSort] = useState<RelationshipSortState>({
    key: null,
    direction: null,
  })
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const sortedItems = useMemo(() => sortRelationshipUsers(items, sort), [items, sort])

  const paginatedItems = useMemo(() => {
    return paginateItems(sortedItems, page, pageSize)
  }, [sortedItems, page, pageSize])

  const handleSort = (key: RelationshipSortBy) => {
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
    <>
      <RelationshipTableTab items={paginatedItems} sort={sort} onSort={handleSort} />
      <Pagination
        currentPage={page}
        totalItems={sortedItems.length}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </>
  )
}
