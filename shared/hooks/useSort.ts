'use client'

import { useState, useCallback } from 'react'

import { type SortDirection } from '@/shared/api/graphql/gql/graphql'

export type SortState<T> = {
  key: T | null
  direction: SortDirection | null
}

type UseSortParams<T> = {
  initialKey?: T | null
  initialDirection?: SortDirection | null
}

const SORT_ASC: SortDirection = 'asc'
const SORT_DESC: SortDirection = 'desc'

export const useSort = <T>({
  initialKey = null,
  initialDirection = null,
}: UseSortParams<T> = {}) => {
  const [sort, setSort] = useState<SortState<T>>({
    key: initialKey,
    direction: initialDirection,
  })

  const onSort = useCallback((key: T) => {
    setSort(prev => {
      if (prev.key !== key) {
        return { key, direction: SORT_ASC }
      }

      if (prev.direction === SORT_ASC) {
        return { key, direction: SORT_DESC }
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
