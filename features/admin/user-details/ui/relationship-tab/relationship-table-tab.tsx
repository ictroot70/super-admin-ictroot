import { formatDate } from '@/shared/lib/format'
import {
  SortableHeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/shared/ui'

import {
  RelationshipSortBy,
  RelationshipSortState,
  RelationshipUserViewModel,
} from './relationship-tab.type'

type Column = {
  id: string
  title: string
  sortKey?: RelationshipSortBy
}

const columns: Column[] = [
  { id: 'userId', title: 'ID User' },
  { id: 'username', title: 'Username' },
  { id: 'profileLink', title: 'Profile link', sortKey: RelationshipSortBy.PROFILE_LINK },
  {
    id: 'subscriptionDate',
    title: 'Subscription date',
    sortKey: RelationshipSortBy.SUBSCRIPTION_DATE,
  },
]

type Props = {
  items: RelationshipUserViewModel[]
  sort: RelationshipSortState
  onSort: (key: RelationshipSortBy) => void
}

export function RelationshipTableTab({ items, sort, onSort }: Props) {
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

        <TableBody>
          {items.map(item => (
            <TableRow key={item.userId}>
              <TableCell>{item.userId}</TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.profileLink}</TableCell>
              <TableCell>{formatDate(item.subscriptionDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
