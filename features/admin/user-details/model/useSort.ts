'use client'

import { useState, useCallback } from 'react'

export type SortDirection = 'asc' | 'desc' | null

export type SortState<T> = {
  key: T | null
  direction: SortDirection
}

export const useSort = <T>() => {
  const [sort, setSort] = useState<SortState<T>>({
    key: null,
    direction: null,
  })

  const onSort = useCallback((key: T) => {
    setSort(prev => {
      if (prev.key !== key) {
        return { key, direction: 'asc' }
      }

      if (prev.direction === 'asc') {
        return { key, direction: 'desc' }
      }

      return { key: null, direction: null }
    })
  }, [])

  return {
    sort,
    setSort,
    onSort,
  }
}
