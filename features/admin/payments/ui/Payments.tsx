'use client'

import { Input, Pagination } from '@ictroot/ui-kit'

import { usePaymentsList } from '@/features/admin/payments/model/use-payments-list'

type PaymentsSortBy = 'createdAt' | 'amount' | 'paymentMethod' | 'userName'

type Column = {
  key: PaymentsSortBy
  title: string
}

const columns: Column[] = [
  { key: 'userName', title: 'Full Name' },
  { key: 'createdAt', title: 'Date added' },
  { key: 'amount', title: 'Amount, $' },
  { key: 'paymentMethod', title: 'Payment Method' },
]

const formatDate = (value: string | null) => {
  if (!value) {
    return '—'
  }

  return new Date(value).toLocaleDateString('ru-RU')
}

const formatAmount = (amount: number | null, currency: string | null) => {
  if (amount === null) {
    return '—'
  }

  return `${amount} ${currency ?? ''}`.trim()
}

const formatSubscription = (value: string) => {
  switch (value) {
    case 'DAY':
      return '1 day'
    case 'WEEKLY':
      return '7 days'
    case 'MONTHLY':
      return '1 month'
    default:
      return value
  }
}

const formatPaymentMethod = (value: string) => {
  switch (value) {
    case 'CREDIT_CARD':
      return 'Credit Card'
    case 'PAYPAL':
      return 'PayPal'
    case 'STRIPE':
      return 'Stripe'
    default:
      return value
  }
}

const getDirectionMark = (isActive: boolean, sortDirection: 'asc' | 'desc') => {
  if (!isActive) {
    return ''
  }

  if (sortDirection === 'asc') {
    return ' ↑'
  }

  return ' ↓'
}

export function Payments() {
  const {
    payments,
    searchTerm,
    sortBy,
    sortDirection,
    setSearchTerm,
    handleSort,
    handlePageChange,
  } = usePaymentsList()

  const isInitialLoading = payments.isLoading && payments.items.length === 0

  if (payments.isError) {
    return <div>{'Failed to load payments'}</div>
  }

  let content = null

  if (isInitialLoading) {
    content = <div>{'Loading...'}</div>
  } else if (payments.items.length === 0) {
    content = <div>{'No payments found'}</div>
  } else {
    content = (
      <>
        <div className={'overflow-x-auto'}>
          <table className={'w-full border-collapse'}>
            <thead>
              <tr>
                {columns.map(column => {
                  const isActive = sortBy === column.key
                  const directionMark = getDirectionMark(isActive, sortDirection)

                  return (
                    <th key={column.key} className={'border px-4 py-3 text-left'}>
                      <button
                        type={'button'}
                        onClick={() => handleSort(column.key)}
                        className={'cursor-pointer bg-transparent'}
                      >
                        {column.title}
                        {directionMark}
                      </button>
                    </th>
                  )
                })}
                <th className={'border px-4 py-3 text-left'}>{'Subscription'}</th>
              </tr>
            </thead>

            <tbody>
              {payments.items.map(item => (
                <tr key={item.id ?? `${item.userId}-${item.createdAt}`}>
                  <td className={'border px-4 py-3'}>{item.userName}</td>
                  <td className={'border px-4 py-3'}>{formatDate(item.createdAt)}</td>
                  <td className={'border px-4 py-3'}>{formatAmount(item.amount, item.currency)}</td>
                  <td className={'border px-4 py-3'}>{formatPaymentMethod(item.paymentMethod)}</td>
                  <td className={'border px-4 py-3'}>{formatSubscription(item.type)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={'mt-6'}>
          <Pagination
            currentPage={payments.page}
            totalItems={payments.totalCount}
            itemsPerPage={payments.pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    )
  }

  return (
    <div className={'p-6'}>
      <div className={'mb-6 max-w-[400px]'}>
        <Input
          inputType={'search'}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={'Search'}
          reserveErrorSpace={false}
        />
      </div>

      {content}
    </div>
  )
}
