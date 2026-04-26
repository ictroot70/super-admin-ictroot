import type { ReactNode } from 'react'

import { SortableHeaderCell, Table, TableHead, TableHeaderCell, TableRow } from '@/shared/ui'

type SortDirection = 'asc' | 'desc' | null

type SortState<T extends string> = {
  key: T | null
  direction: SortDirection
}

export type UserDetailsTableColumn<T extends string> = {
  id: string
  title: string
  sortKey?: T
}

type Props<T extends string> = {
  columns: UserDetailsTableColumn<T>[]
  sort: SortState<T>
  onSort: (key: T) => void
  children: ReactNode
}

export function UserDetailsTableShell<T extends string>({
  columns,
  sort,
  onSort,
  children,
}: Props<T>) {
  return (
    <div className={'min-h-0 overflow-auto'}>
      <Table>
        <TableHead className={'sticky top-0 z-2'}>
          <TableRow>
            {columns.map(column =>
              column.sortKey ? (
                <SortableHeaderCell
                  key={column.id}
                  columnKey={column.sortKey}
                  title={column.title}
                  activeKey={sort.key ?? undefined}
                  direction={sort.direction}
                  onSort={onSort}
                />
              ) : (
                <TableHeaderCell key={column.id} scope={'col'}>
                  {column.title}
                </TableHeaderCell>
              )
            )}
          </TableRow>
        </TableHead>

        {children}
      </Table>
    </div>
  )
}
