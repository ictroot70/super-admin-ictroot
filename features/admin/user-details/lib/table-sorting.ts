import { Dispatch, SetStateAction } from 'react'

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortState<TKey extends string> = {
  key: TKey | null
  direction: SortDirection | null
}

export const getNextSortState = <TKey extends string>(
  sort: SortState<TKey>,
  key: TKey
): SortState<TKey> => {
  if (sort.key !== key) {
    return {
      key,
      direction: SortDirection.ASC,
    }
  }

  if (sort.direction === SortDirection.ASC) {
    return {
      key,
      direction: SortDirection.DESC,
    }
  }

  return {
    key: null,
    direction: null,
  }
}

type HandleSortParams<TKey extends string> = {
  key: TKey
  sort: SortState<TKey>
  setSort: Dispatch<SetStateAction<SortState<TKey>>>
  resetPage?: () => void
}

export const handleSortChange = <TKey extends string>({
  key,
  sort,
  setSort,
  resetPage,
}: HandleSortParams<TKey>) => {
  setSort(getNextSortState(sort, key))
  resetPage?.()
}
