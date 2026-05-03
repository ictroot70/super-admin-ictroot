import { PaymentMethod, SubscriptionType } from '@/shared/api/graphql/gql/graphql'

export const mapSubscriptionTypeToLabel = (type: SubscriptionType) => {
  switch (type) {
    case 'DAY':
      return '1 day'
    case 'MONTHLY':
      return '7 days'
    case 'WEEKLY':
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
