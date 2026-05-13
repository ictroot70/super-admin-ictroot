'use client'

import { CheckboxRadix, Input, Pagination } from '@ictroot/ui-kit'
import { useState } from 'react'

import { usePaymentsList } from '@/features/admin/payments/model/use-payments-list'
import {
  SortableHeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/shared/ui'

type PaymentsSortBy = 'createdAt' | 'amount' | 'paymentMethod' | 'userName'

type Column = {
  key?: PaymentsSortBy
  title: string
}

const columns: Column[] = [
  { key: 'userName', title: 'Full Name' },
  { key: 'createdAt', title: 'Date added' },
  { key: 'amount', title: 'Amount, $' },
  { title: 'Subscription' },
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
    handlePageSizeChange,
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
        <div className={'overflow-x-auto rounded-[2px]'}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column =>
                  column.key ? (
                    <SortableHeaderCell
                      key={column.title}
                      columnKey={column.key}
                      title={column.title}
                      activeKey={sortBy}
                      direction={sortDirection}
                      onSort={handleSort}
                    />
                  ) : (
                    <TableHeaderCell key={column.title} scope={'col'}>
                      {column.title}
                    </TableHeaderCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {payments.items.map(item => {
                const avatarUrl = getAvatarUrl(item.avatars)

                return (
                  <TableRow key={item.id ?? `${item.userId}-${item.createdAt}`}>
                    <TableCell>
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
                              'text-light-100 flex h-9 w-9 items-center justify-center rounded-full border border-(--color-dark-500) text-xs'
                            }
                          >
                            {item.userName.slice(0, 1).toUpperCase()}
                          </div>
                        )}

                        <span className={'text-light-100'}>{item.userName}</span>
                      </div>
                    </TableCell>

                    <TableCell>{formatDate(item.createdAt)}</TableCell>

                    <TableCell>{formatAmount(item.amount, item.currency)}</TableCell>

                    <TableCell>{formatSubscription(item.type)}</TableCell>

                    <TableCell>{formatPaymentMethod(item.paymentMethod)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <div className={'mt-6'}>
          <Pagination
            currentPage={payments.page}
            totalItems={payments.totalCount}
            itemsPerPage={payments.pageSize}
            onPageChange={handlePageChange}
            pageSizeOptions={[10, 20, 50, 100]}
            onItemsPerPageChange={handlePageSizeChange}
          />
        </div>
      </>
    )
  }

  return (
    <div className={'mx-auto w-full max-w-[1200px] px-6 py-8'}>
      <div className={'mb-6 flex justify-end'}>
        <label className={'text-light-100 flex items-center gap-3 whitespace-nowrap'}>
          <CheckboxRadix
            checked={isAutoUpdateEnabled}
            onCheckedChange={checked => setIsAutoUpdateEnabled(Boolean(checked))}
          />
          <span>{'Autoupdate'}</span>
        </label>
      </div>

      <div className={'mb-6 w-full'}>
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
