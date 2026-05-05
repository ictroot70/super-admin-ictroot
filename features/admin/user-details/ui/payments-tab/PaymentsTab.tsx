'use client'

import { Pagination, LoadingBar, Typography, Loading } from '@/shared/ui'

import { usePaymentsTab } from '../../model'
import { PaymentsTableTab } from './PaymentsTableTab'

export function PaymentsTab() {
  const { items, sort, error, isLoading, isRefreshing, paginationProps, onSort } = usePaymentsTab()

  if (isLoading) return <Loading />
  if (error) return <div>Failed to load payments.</div>

  if (!items.length) return <Typography variant={'h2'}>There are no payments yet.</Typography>

  return (
    <div className={'flex h-full min-h-0 flex-col gap-6'}>
      <div className={'relative'}>
        {isRefreshing && <LoadingBar />}
        <PaymentsTableTab items={items} sort={sort} onSort={onSort} />
      </div>

      <Pagination {...paginationProps} />
    </div>
  )
}
