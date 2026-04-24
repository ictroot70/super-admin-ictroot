export interface PaymentsViewModel {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  price: number
  subscriptionType: SubscriptionType
  paymentType: PaymentType
}

export enum SubscriptionType {
  MONTHLY = 'MONTHLY',
  DAY = 'DAY',
  WEEKLY = 'WEEKLY',
}

export enum PaymentType {
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  CREDIT_CARD = 'CREDIT_CARD',
}

export enum PaymentsSortBy {
  CREATED_AT = 'createdAt',
  DATE_OF_PAYMENT = 'dateOfPayment',
  END_DATE = 'endDate',
  PAYMENT_TYPE = 'paymentType',
  PRICE = 'price',
}

export type PaymentsSortState = {
  key: PaymentsSortBy | null
  direction: PaymentsSortDirection | null
}

export enum PaymentsSortDirection {
  ASC = 'asc',
  DESC = 'desc',
}
