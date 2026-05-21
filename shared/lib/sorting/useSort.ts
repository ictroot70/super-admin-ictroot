'use client'

import { useState, useCallback } from 'react'

import { SortDirection } from '@/shared/api/graphql/gql/graphql'

export type SortState<T> = {
  key: T | null
  direction: SortDirection | null
}

export const useSort = <T>() => {
  const [sort, setSort] = useState<SortState<T>>({
    key: null,
    direction: null,
  })

  const onSort = useCallback((key: T) => {
    setSort(prev => {
      if (prev.key !== key) {
        return { key, direction: SortDirection.Asc }
      }

      if (prev.direction === SortDirection.Asc) {
        return { key, direction: SortDirection.Desc }
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
