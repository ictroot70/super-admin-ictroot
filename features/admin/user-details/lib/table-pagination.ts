import { Dispatch, SetStateAction } from 'react'

export const DEFAULT_PAGE_NUMBER = 1

export const handlePaginationPageChange = (
  nextPage: number,
  setPage: Dispatch<SetStateAction<number>>
) => {
  setPage(nextPage)
}

type Props = {
  nextPageSize: number
  setPageSize: Dispatch<SetStateAction<number>>
  setPage: Dispatch<SetStateAction<number>>
  defaultPage?: number
}

export const handlePaginationItemsPerPageChange = ({
  nextPageSize,
  setPageSize,
  setPage,
  defaultPage = DEFAULT_PAGE_NUMBER,
}: Props) => {
  setPageSize(nextPageSize)
  setPage(defaultPage)
}

export const paginateItems = <TItem>(items: TItem[], page: number, pageSize: number) => {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  return items.slice(startIndex, endIndex)
}
