import { formatDate } from '@/shared/lib/format'
import { TableBody, TableCell, TableRow } from '@/shared/ui'

import { UserDetailsTableColumn, UserDetailsTableShell } from '../user-details-table-shell'
import {
  RelationshipSortBy,
  RelationshipSortState,
  RelationshipUserViewModel,
} from './relationship-tab.type'

const columns: UserDetailsTableColumn<RelationshipSortBy>[] = [
  { id: 'userId', title: 'User ID' },
  { id: 'profileLink', title: 'Profile link', sortKey: RelationshipSortBy.PROFILE_LINK },
  { id: 'username', title: 'Username' },
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
    <UserDetailsTableShell columns={columns} sort={sort} onSort={onSort}>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.userId}>
            <TableCell>{item.userId}</TableCell>
            <TableCell>{item.profileLink}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{formatDate(item.subscriptionDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </UserDetailsTableShell>
  )
}
