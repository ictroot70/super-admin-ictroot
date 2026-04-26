import { SortDirection } from '../../lib/table-sorting'
import {
  PaymentsSortBy,
  PaymentsSortState,
  PaymentsViewModel,
  PaymentType,
  SubscriptionType,
} from './payments-tab.type'

const assertNever = (value: never): never => {
  throw new Error(`Unsupported subscription type: ${String(value)}`)
}

export const mapSubscriptionTypeToLabel = (type: SubscriptionType) => {
  switch (type) {
    case SubscriptionType.DAY:
      return '1 day'
    case SubscriptionType.WEEKLY:
      return '7 days'
    case SubscriptionType.MONTHLY:
      return '1 month'
    default:
      return assertNever(type)
  }
}

export const mapPaymentTypeToLabel = (type: PaymentType) => {
  switch (type) {
    case PaymentType.STRIPE:
      return 'Stripe'
    case PaymentType.PAYPAL:
      return 'PayPal'
    case PaymentType.CREDIT_CARD:
      return 'Credit card'
    default:
      return assertNever(type)
  }
}

export const sortPayments = (
  items: PaymentsViewModel[],
  sort: PaymentsSortState
): PaymentsViewModel[] => {
  if (!sort.key || !sort.direction) {
    return items
  }
  const directionMultiplier = sort.direction === SortDirection.ASC ? 1 : -1

  return [...items].sort((a, b) => {
    switch (sort.key) {
      case PaymentsSortBy.DATE_OF_PAYMENT:
        return (
          (new Date(a.dateOfPayment).getTime() - new Date(b.dateOfPayment).getTime()) *
          directionMultiplier
        )

      case PaymentsSortBy.END_DATE:
        return (
          (new Date(a.endDateOfSubscription).getTime() -
            new Date(b.endDateOfSubscription).getTime()) *
          directionMultiplier
        )

      case PaymentsSortBy.PRICE:
        return (a.price - b.price) * directionMultiplier

      case PaymentsSortBy.PAYMENT_TYPE:
        return a.paymentType.localeCompare(b.paymentType) * directionMultiplier

      default:
        return 0
    }
  })
}
