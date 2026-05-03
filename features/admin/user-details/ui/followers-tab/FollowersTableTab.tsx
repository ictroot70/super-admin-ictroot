import type { GetFollowersQuery } from '@/shared/api/graphql/gql/graphql'

import Link from 'next/link'

import { APP_ROUTES } from '@/shared/constant/app-routes'
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

import { FollowersSortBy, FollowersSortState } from '../../lib/followersTabTypes.type'

type Column = {
  id: string
  title: string
  sortKey?: FollowersSortBy
}

type Props = {
  items: GetFollowersQuery['getFollowers']['items']
  sort: FollowersSortState
  onSort: (key: FollowersSortBy) => void
}

const columns: Column[] = [
  { id: 'userId', title: 'User ID' },
  { id: 'profileLink', title: 'Profile link', sortKey: 'userName' },
  { id: 'username', title: 'Username' },
  { id: 'subscriptionDate', title: 'Subscription date', sortKey: 'createdAt' },
]

export function FollowersTableTab({ items, sort, onSort }: Props) {
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
          {items.map(item => {
            const profileLink = APP_ROUTES.USERS.ID(item.userId)
            const fullName = item.firstName + ' ' + item.lastName

            return (
              <TableRow key={item.id}>
                <TableCell>{item.userId}</TableCell>
                <TableCell>
                  <Link href={profileLink} className={'pointer underline'}>
                    {item.userName}
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
  )
}
