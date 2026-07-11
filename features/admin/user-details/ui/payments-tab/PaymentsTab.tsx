'use client'
import { LinearProgress, Loading, Pagination, Typography } from '@/shared/ui'

import { usePaymentsTab } from '../../model'
import { PaymentsTableTab } from './PaymentsTableTab'

export function PaymentsTab() {
  const { items, sort, error, isLoading, isRefreshing, paginationProps, onSort } = usePaymentsTab()

  if (isLoading) return <Loading />
  if (error) return <div>Failed to load payments.</div>

  if (!items.length)
    return (
      <Typography variant={'h2'} className={'text-center'}>
        There are no payments yet.
      </Typography>
    )

  return (
    <div className={'flex h-full min-h-0 flex-col gap-6'}>
      <div className={'fixed top-0 right-0 left-0 z-100 w-full'}>
        <LinearProgress active={isRefreshing} />
      </div>

      <PaymentsTableTab items={items} sort={sort} onSort={onSort} />

      <Pagination {...paginationProps} />
    </div>
  )
}
