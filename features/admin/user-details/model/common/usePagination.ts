'use client'
import { useState, useCallback } from 'react'

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../lib'

type UsePaginationParams = {
  initialPage?: number
  initialPageSize?: number
}

export const usePagination = ({
  initialPage = DEFAULT_PAGE_NUMBER,
  initialPageSize = DEFAULT_PAGE_SIZE,
}: UsePaginationParams = {}) => {
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const onPageChange = useCallback((nextPage: number) => {
    setPage(nextPage)
  }, [])

  const onPageSizeChange = useCallback(
    (nextPageSize: number) => {
      setPageSize(nextPageSize)
      setPage(initialPage)
    },
    [initialPage]
  )

  const resetPage = useCallback(() => {
    setPage(initialPage)
  }, [initialPage])

  return {
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    resetPage,
  }
}
