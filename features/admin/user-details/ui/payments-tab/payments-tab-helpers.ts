import { PaymentType, SubscriptionType } from './payments-tab.type'

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
