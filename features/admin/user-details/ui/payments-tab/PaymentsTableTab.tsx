import type { GetPaymentsByUserQuery } from '@/shared/api/graphql/gql/graphql'

import { formatDate, formatPrice } from '@/shared/lib/format'
import {
  SortableHeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/shared/ui'

import { mapPaymentTypeToLabel, mapSubscriptionTypeToLabel } from '../../lib/paymentsTabHelpers'
import { PaymentsSortBy, PaymentsSortState } from '../../lib/paymentsTabTypes.type'

type Column = {
  id: string
  title: string
  sortKey?: PaymentsSortBy
}

type Props = {
  items: GetPaymentsByUserQuery['getPaymentsByUser']['items']
  sort: PaymentsSortState
  onSort: (key: PaymentsSortBy) => void
}

const columns: Column[] = [
  { id: 'dateOfPayment', title: 'Date of payment', sortKey: 'dateOfPayment' },
  { id: 'endDate', title: 'End date of subscription', sortKey: 'endDate' },
  { id: 'price', title: 'Amount, $', sortKey: 'price' },
  { id: 'type', title: 'Subscription Type' },
  { id: 'paymentType', title: 'Payment Type', sortKey: 'paymentType' },
]

export function PaymentsTableTab({ items, sort, onSort }: Props) {
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
            <TableRow key={item.id}>
              <TableCell>{item.dateOfPayment ? formatDate(item.dateOfPayment) : '-'}</TableCell>
              <TableCell>{item.endDate ? formatDate(item.endDate) : '-'}</TableCell>
              <TableCell>{formatPrice(item.price)}</TableCell>
              <TableCell>{mapSubscriptionTypeToLabel(item.type)}</TableCell>
              <TableCell>
                {item.paymentType ? mapPaymentTypeToLabel(item.paymentType) : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
