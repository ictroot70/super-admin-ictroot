'use client'

import { LoadingBar, Pagination } from '@/shared/ui'

import { useFollowersTab } from '../../model'
import { FollowersTableTab } from './FollowersTableTab'

export function FollowersTab() {
  const { items, sort, error, isLoading, isRefreshing, paginationProps, onSort } = useFollowersTab()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load followers.</div>

  return (
    <div className={'flex h-full min-h-0 flex-col gap-6'}>
      <div className={'relative'}>
        {isRefreshing && <LoadingBar />}
        <FollowersTableTab items={items} sort={sort} onSort={onSort} />
      </div>

      <Pagination {...paginationProps} />
    </div>
  )
}
