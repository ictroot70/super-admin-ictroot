import { formatDate, formatPrice } from '@/shared/lib/format'
import { TableBody, TableCell, TableRow } from '@/shared/ui'

import { UserDetailsTableColumn, UserDetailsTableShell } from '../user-details-table-shell'
import { mapPaymentTypeToLabel, mapSubscriptionTypeToLabel } from './payments-tab-helpers'
import { PaymentsSortBy, PaymentsSortState, PaymentsViewModel } from './payments-tab.type'

const columns: UserDetailsTableColumn<PaymentsSortBy>[] = [
  { id: 'dateOfPayment', title: 'Date of payment', sortKey: PaymentsSortBy.DATE_OF_PAYMENT },
  { id: 'endDate', title: 'End date of subscription', sortKey: PaymentsSortBy.END_DATE },
  { id: 'price', title: 'Amount, $', sortKey: PaymentsSortBy.PRICE },
  { id: 'subscriptionType', title: 'Subscription Type' },
  { id: 'paymentType', title: 'Payment Type', sortKey: PaymentsSortBy.PAYMENT_TYPE },
]

type Props = {
  items: PaymentsViewModel[]
  sort: PaymentsSortState
  onSort: (key: PaymentsSortBy) => void
}

export function PaymentsTableTab({ items, sort, onSort }: Props) {
  return (
    <UserDetailsTableShell columns={columns} sort={sort} onSort={onSort}>
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
    </UserDetailsTableShell>
  )
}
