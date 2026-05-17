import {
  SortableHeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/shared/composites/Table'
import { BlockFull } from '@/shared/ui'

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
}

export function UsersTable({ items, sort, onSort, onUserActionComplete }: Props) {
  const handleActionComplete = () => {
    onUserActionComplete?.()
  }

  return (
    <div className={'mb-[36px] overflow-x-auto'}>
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
                <TableHeaderCell key={column.id} scope={'col'}>
                  {column.title}
                </TableHeaderCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map(item => (
              <TableRow key={item.userId}>
                <TableCell>
                  <div className={'flex items-center gap-2'}>
                    {item.isBlocked && (
                      <BlockFull
                        className={'h-4 w-4 flex-shrink-0 text-red-500'}
                        aria-label={'User is blocked'}
                      />
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
                    userId={String(item.userId)}
                    userName={item.username}
                    isBanned={item.isBlocked}
                    onActionComplete={handleActionComplete}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className={'p-8 text-center opacity-60'}>
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
