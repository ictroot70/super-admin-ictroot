import type { PaymentMethod, SubscriptionType } from '@/shared/api/graphql/gql/graphql'

export const formatSubscriptionType = (value: SubscriptionType) => {
  switch (value) {
    case 'DAY':
      return '1 day'
    case 'WEEKLY':
      return '7 days'
    case 'MONTHLY':
      return '1 month'
  }
}

export const formatPaymentMethod = (value: PaymentMethod) => {
  switch (value) {
    case 'CREDIT_CARD':
      return 'Credit Card'
    case 'PAYPAL':
      return 'PayPal'
    case 'STRIPE':
      return 'Stripe'
  }
}
