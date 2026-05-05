'use client'

import { CheckboxRadix, Input, Pagination } from '@ictroot/ui-kit'
import { useState } from 'react'

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

const getAvatarUrl = (
  avatars:
    | {
        url: string | null
        width: number | null
        height: number | null
        fileSize: number | null
      }[]
    | null
) => {
  if (!avatars || avatars.length === 0) {
    return null
  }

  return avatars[0]?.url ?? null
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

  const [isAutoUpdateEnabled, setIsAutoUpdateEnabled] = useState(true)

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
        <div className={'overflow-x-auto rounded-[2px] border border-[#171717]'}>
          <table className={'w-full border-collapse'}>
            <thead className={'bg-[#171717]'}>
              <tr className={'border-b border-[#171717]'}>
                {columns.map(column => {
                  const isActive = sortBy === column.key
                  const directionMark = getDirectionMark(isActive, sortDirection)

                  return (
                    <th key={column.key} className={'px-6 py-4 text-left'}>
                      <button
                        type={'button'}
                        onClick={() => handleSort(column.key)}
                        className={'text-light-100 cursor-pointer bg-transparent'}
                      >
                        {column.title}
                        {directionMark}
                      </button>
                    </th>
                  )
                })}
                <th className={'text-light-100 px-6 py-4 text-left'}>{'Subscription'}</th>
              </tr>
            </thead>

            <tbody>
              {payments.items.map(item => {
                const avatarUrl = getAvatarUrl(item.avatars)

                return (
                  <tr
                    key={item.id ?? `${item.userId}-${item.createdAt}`}
                    className={'border-b border-[#1F1F1F] last:border-b-0'}
                  >
                    <td className={'px-6 py-4'}>
                      <div className={'flex items-center gap-3'}>
                        {avatarUrl ? (
                          <div
                            aria-label={item.userName}
                            className={'h-9 w-9 rounded-full bg-cover bg-center bg-no-repeat'}
                            style={{ backgroundImage: `url("${avatarUrl}")` }}
                          />
                        ) : (
                          <div
                            className={
                              'text-light-100 flex h-9 w-9 items-center justify-center rounded-full border border-[#171717] text-xs'
                            }
                          >
                            {item.userName.slice(0, 1).toUpperCase()}
                          </div>
                        )}

                        <span className={'text-light-100'}>{item.userName}</span>
                      </div>
                    </td>

                    <td className={'text-light-100 px-6 py-4'}>{formatDate(item.createdAt)}</td>

                    <td className={'text-light-100 px-6 py-4'}>
                      {formatAmount(item.amount, item.currency)}
                    </td>

                    <td className={'text-light-100 px-6 py-4'}>
                      {formatPaymentMethod(item.paymentMethod)}
                    </td>

                    <td className={'text-light-100 px-6 py-4'}>{formatSubscription(item.type)}</td>
                  </tr>
                )
              })}
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
    <div className={'mx-auto w-full max-w-[1200px] px-6 py-8'}>
      <div className={'mb-6 flex justify-end'}>
        <label className={'text-light-100 flex items-center gap-3'}>
          <CheckboxRadix
            checked={isAutoUpdateEnabled}
            onCheckedChange={checked => setIsAutoUpdateEnabled(Boolean(checked))}
          />
          <span>{'Autoupdate'}</span>
        </label>
      </div>

      <div className={'mb-6 max-w-[440px]'}>
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
