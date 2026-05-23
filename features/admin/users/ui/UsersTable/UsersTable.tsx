'use client'

import {
  SortableHeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  BlockFull,
  LoadingBar,
} from '@/shared/ui'

import { UsersSortBy, UsersSortState, UsersViewModel } from '../../model'
import { UserActionMenu } from '../UserActionMenu'

type Column = {
  id: string
  title: string
  sortKey?: UsersSortBy
}

const columns: Column[] = [
  { id: 'userId', title: 'User ID' },
  { id: 'email', title: 'Profile link', sortKey: UsersSortBy.EMAIL },
  { id: 'username', title: 'Username' },
  { id: 'dateAdded', title: 'Date Added', sortKey: UsersSortBy.CREATED_AT },
  { id: 'actions', title: '' },
]

type Props = {
  sort: UsersSortState
  items: UsersViewModel[]
  onSort: (key: UsersSortBy) => void
  onUserActionComplete?: () => void
  isFetching?: boolean
}

export function UsersTable({ items, sort, onSort, onUserActionComplete, isFetching }: Props) {
  const handleActionComplete = () => {
    onUserActionComplete?.()
  }

  return (
    <div className={'relative mb-9 overflow-x-auto'}>
      {isFetching && <LoadingBar />}

      <Table>
        <TableHead>
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
                <TableHeaderCell
                  key={column.id}
                  scope={'col'}
                  className={column.id === 'userId' ? 'w-1 whitespace-nowrap' : undefined}
                >
                  {column.title}
                </TableHeaderCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.userId}>
              <TableCell className={'w-1 whitespace-nowrap'}>
                <div className={'flex items-center justify-end gap-3'}>
                  {item.isBlocked && (
                    <BlockFull className={'h-4 w-4 shrink-0'} aria-label={'User is blocked'} />
                  )}
                  <span>{item.userId}</span>
                </div>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <a
                  href={item.profileLink}
                  className={'text-[var(--color-primary)] no-underline hover:underline'}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                >
                  {item.username}
                </a>
              </TableCell>
              <TableCell>{item.dateAdded}</TableCell>
              <TableCell>
                <UserActionMenu
                  userId={item.userId}
                  userName={item.username}
                  isBanned={item.isBlocked}
                  onActionComplete={handleActionComplete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
