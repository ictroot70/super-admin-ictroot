'use client'

import { useState } from 'react'

import { PAGE_SIZE_OPTIONS } from '@/shared/constant'
import { formatAmount, formatDate } from '@/shared/lib'
import {
  CheckboxRadix,
  Input,
  LinearProgress,
  Loading,
  Typography,
  Pagination,
  SortableHeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/shared/ui'

import { usePaymentsList } from '../model'

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
        __typename?: 'Avatar'
        url?: string | null
        width?: number | null
        height?: number | null
        fileSize?: number | null
      }[]
    | null
    | undefined
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

  const hasItems = payments.items.length > 0
  const isInitialLoading = payments.isLoading && !hasItems
  const isBackgroundLoading = payments.isLoading && hasItems

  if (payments.isError) {
    return <div>{'Failed to load payments'}</div>
  }

  let content = null

  if (isInitialLoading) {
    content = <Loading />
  } else if (!hasItems) {
    content = (
      <Typography variant={'h2'} className={'text-center'}>
        {'No payments found'}
      </Typography>
    )
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
                      activeKey={sortBy ?? undefined}
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

                    <TableCell>{formatDate(item.createdAt ?? null)}</TableCell>

                    <TableCell>{formatAmount(item.amount ?? null)}</TableCell>

                    <TableCell>{formatSubscription(item.type)}</TableCell>

                    <TableCell>{formatPaymentMethod(item.paymentMethod)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <div className={'mt-10'}>
          <Pagination
            currentPage={payments.page}
            totalItems={payments.totalCount}
            itemsPerPage={payments.pageSize}
            onPageChange={handlePageChange}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            onItemsPerPageChange={handlePageSizeChange}
          />
        </div>
      </>
    )
  }

  return (
    <div className={'mx-auto w-full px-6'}>
      <div className={'fixed top-0 right-0 left-0 z-100 w-full'}>
        <LinearProgress active={isInitialLoading || isBackgroundLoading} />
      </div>

      <div className={'bg-background sticky top-0 z-50 pt-5'}>
        <div className={'mb-5 flex justify-end'}>
          <label className={'text-light-100 flex items-center gap-3 whitespace-nowrap'}>
            <CheckboxRadix
              checked={isAutoUpdateEnabled}
              onCheckedChange={checked => setIsAutoUpdateEnabled(Boolean(checked))}
            />
            <span>{'Autoupdate'}</span>
          </label>
        </div>

        <div className={'relative mb-8 w-full'}>
          <Input
            inputType={'search'}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={'Search'}
            reserveErrorSpace={false}
          />
          <div
            className={
              'from-background pointer-events-none absolute right-0 left-0 h-8 bg-linear-to-b from-10% to-transparent'
            }
          />
        </div>
      </div>

      {content}
    </div>
  )
}
