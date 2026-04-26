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

import { mapPaymentTypeToLabel, mapSubscriptionTypeToLabel } from './payments-tab-helpers'
import { PaymentsSortBy, PaymentsSortState, PaymentsViewModel } from './payments-tab.type'

type Column = {
  id: string
  title: string
  sortKey?: PaymentsSortBy
}

const columns: Column[] = [
  { id: 'dateOfPayment', title: 'Date of payment', sortKey: PaymentsSortBy.DATE_OF_PAYMENT },
  { id: 'endDate', title: 'End date of subscription', sortKey: PaymentsSortBy.END_DATE },
  { id: 'price', title: 'Amount, $', sortKey: PaymentsSortBy.PRICE },
  { id: 'subscriptionType', title: 'Subscription Type' },
  { id: 'paymentType', title: 'Payment Type', sortKey: PaymentsSortBy.PAYMENT_TYPE },
]

type Props = {
  sort: PaymentsSortState
  items: PaymentsViewModel[]
  onSort: (key: PaymentsSortBy) => void
}

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
            <TableRow key={item.subscriptionId}>
              <TableCell>{formatDate(item.dateOfPayment)}</TableCell>
              <TableCell>{formatDate(item.endDateOfSubscription)}</TableCell>
              <TableCell>{formatPrice(item.price)}</TableCell>
              <TableCell>{mapSubscriptionTypeToLabel(item.subscriptionType)}</TableCell>
              <TableCell>{mapPaymentTypeToLabel(item.paymentType)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
