'use client'

import Link from 'next/link'

import { APP_ROUTES } from '@/shared/constant/app-routes'
import { formatDate } from '@/shared/lib/format'
import {
  LoadingBar,
  Pagination,
  type PaginationProps,
  SortableHeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/shared/ui'

import {
  type UserRelationshipItem,
  type UserRelationshipsSortBy,
  type UserRelationshipsSortState,
} from '../../lib/userRelationshipsTabTypes.type'

type Column = {
  id: string
  title: string
  sortKey?: UserRelationshipsSortBy
}

type Props = {
  items: UserRelationshipItem[]
  sort: UserRelationshipsSortState
  error?: unknown
  isLoading: boolean
  isRefreshing: boolean
  paginationProps: PaginationProps
  onSort: (key: UserRelationshipsSortBy) => void
  errorMessage: string
}

const columns: Column[] = [
  { id: 'userId', title: 'User ID' },
  { id: 'profileLink', title: 'Profile link', sortKey: 'userName' },
  { id: 'username', title: 'Username' },
  { id: 'subscriptionDate', title: 'Subscription date', sortKey: 'createdAt' },
]

export function UserRelationshipsTab({
  items,
  sort,
  error,
  isLoading,
  isRefreshing,
  paginationProps,
  onSort,
  errorMessage,
}: Props) {
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{errorMessage}</div>

  return (
    <div className={'flex h-full min-h-0 flex-col gap-6'}>
      <div className={'relative'}>
        {isRefreshing && <LoadingBar />}

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

            <TableBody>
              {items.map(item => {
                const profileLink = APP_ROUTES.USERS.ID(item.userId)
                const fullName = [item.firstName, item.lastName].filter(Boolean).join(' ') || '-'

                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.userId}</TableCell>
                    <TableCell>
                      <Link href={profileLink} className={'pointer underline'}>
                        {item.userName ?? profileLink}
                      </Link>
                    </TableCell>
                    <TableCell>{fullName}</TableCell>
                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination {...paginationProps} />
    </div>
  )
}
