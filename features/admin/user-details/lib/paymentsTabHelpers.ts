import { PaymentMethod, SubscriptionType } from '@/shared/api/graphql/gql/graphql'

export const mapSubscriptionTypeToLabel = (type: SubscriptionType) => {
  switch (type) {
    case 'DAY':
      return '1 day'
    case 'WEEKLY':
      return '7 days'
    case 'MONTHLY':
      return '1 month'
  }
}

export const mapPaymentTypeToLabel = (type: PaymentMethod) => {
  switch (type) {
    case 'STRIPE':
      return 'Stripe'
    case 'PAYPAL':
      return 'PayPal'
    case 'CREDIT_CARD':
      return 'Credit card'
  }
}
