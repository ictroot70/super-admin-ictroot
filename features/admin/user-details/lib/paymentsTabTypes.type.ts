import { SortDirection } from '@/shared/api/graphql/gql/graphql'

export type PaymentsSortBy = 'dateOfPayment' | 'endDate' | 'price' | 'paymentType'

export type PaymentsSortState = {
  key: PaymentsSortBy | null
  direction: SortDirection | null
}
