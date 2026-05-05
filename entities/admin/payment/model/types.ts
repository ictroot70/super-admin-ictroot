import { Avatar } from '@/entities/admin/user'

export type PaymentMethod = 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD'
export type CurrencyType = 'USD' | 'EUR'
export type SubscriptionType = 'MONTHLY' | 'DAY' | 'WEEKLY'
export type StatusSubscriptionType = 'ACTIVE' | 'PENDING' | 'FINISHED'

// A5: getPayments -> PaymentsPaginationModel
// items: SubscriptionPaymentsModel[]
export type SubscriptionPaymentsModel = {
  id: number | null
  userId: number | null
  paymentMethod: PaymentMethod // NON_NULL
  amount: number | null // nullable — fallback обязателен
  currency: CurrencyType | null
  createdAt: string | null
  endDate: string | null
  type: SubscriptionType // NON_NULL
  userName: string // NON_NULL
  avatars: Avatar[] | null
}

export type PaymentsPaginationModel = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: SubscriptionPaymentsModel[]
}

// A4: getPaymentsByUser -> PaymentPaginationModel
// items: SubscriptionByPaymentModel[]
// ВАЖНО: сумма/дата/метод берётся из item.payments[], не из верхнего уровня
export type Payment = {
  id: number | null
  userId: number | null
  paymentMethod: PaymentMethod | null
  amount: number | null
  currency: CurrencyType | null
  createdAt: string | null
  endDate: string | null
  type: SubscriptionType | null
}

export type SubscriptionByPaymentModel = {
  id: string // NON_NULL — String, не Int!
  businessAccountId: number // NON_NULL
  status: StatusSubscriptionType // NON_NULL
  dateOfPayment: string | null
  startDate: string | null
  endDate: string | null
  type: SubscriptionType // NON_NULL
  price: number // NON_NULL
  paymentType: PaymentMethod | null
  payments: Payment[] // источник данных для payments-tab
}

export type PaymentPaginationModel = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: SubscriptionByPaymentModel[]
}
