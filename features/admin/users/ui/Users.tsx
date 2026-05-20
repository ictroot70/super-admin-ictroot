'use client'

import { useCallback } from 'react'

import { LinearProgress, Loading, Select } from '@/shared/composites'
import { Input, Pagination, Typography } from '@/shared/ui'

import {
  useUsersList,
  USERS_PAGE_SIZE_OPTIONS,
  FilterValue,
  UsersSortBy,
  FILTER_ITEMS,
} from '../model'
import { EmptyState } from './EmptyState/EmptyState'
import { ErrorState } from './ErrorState/ErrorState'
import { UsersTable } from './UsersTable/UsersTable'

export function Users() {
  const {
    users,
    sort,
    searchTerm,
    filterStatus,
    handleSort,
    handlePageChange,
    handleItemsPerPageChange,
    setSearchTerm,
    setFilterStatus,
    refetch,
  } = useUsersList()

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value)
    },
    [setSearchTerm]
  )

  const handleFilterChange = useCallback(
    (value: string) => {
      setFilterStatus(value as FilterValue)
    },
    [setFilterStatus]
  )

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  const handlePageChangeWithCallback = useCallback(
    (page: number) => {
      handlePageChange(page)
    },
    [handlePageChange]
  )

  const handleItemsPerPageChangeWithCallback = useCallback(
    (size: number) => {
      handleItemsPerPageChange(size)
    },
    [handleItemsPerPageChange]
  )

  const handleSortWithCallback = useCallback(
    (key: UsersSortBy) => {
      handleSort(key)
    },
    [handleSort]
  )

  if (users.isInitialLoading) {
    return <Loading />
  }

  if (users.isError && !users.data?.items.length && !users.isFetching) {
    return <ErrorState onRetry={handleRefetch} />
  }

  const isEmpty = !users.data?.items.length
  const hasActiveFilters = users.data?.hasActiveFilters ?? false

  if (isEmpty && !users.isFetching && !hasActiveFilters) {
    return <EmptyState />
  }

  const showLoading = users.isFetching && !users.data?.items.length
  const showEmptyFilters = isEmpty && !users.isFetching && hasActiveFilters

  return (
    <div className={'flex flex-col gap-9'}>
      <div className={'fixed top-0 right-0 left-0 z-100 w-full'}>
        <LinearProgress active={users.isInitialLoading || users.isFetching} />
      </div>

      <div className={'bg-background sticky top-0 z-50 pt-9'}>
        <div className={'mb-[24px] flex w-full items-center justify-between gap-[46px]'}>
          <div className={'relative z-10 w-[644px] flex-shrink-0'}>
            <Input
              inputType={'search'}
              placeholder={'Search by name or email...'}
              value={searchTerm}
              onChange={e => handleSearchChange(e.target.value)}
              className={'h-[36px] w-full'}
              aria-label={'Search users'}
              reserveErrorSpace={false}
            />
          </div>

          <div className={'w-[234px] flex-shrink-0'}>
            <Select
              items={FILTER_ITEMS}
              value={filterStatus}
              onValueChange={handleFilterChange}
              aria-label={'Filter by status'}
              size={'medium'}
              classNames={{
                trigger:
                  'h-[36px] flex items-center px-[12px] py-0 rounded-[2px] bg-dark-500 hover:border-light-900 focus:border-transparent focus:outline-2 focus:outline-primary-500 !w-full',
                content: 'bg-dark-500 border-light-100 rounded-[2px]',
                item: 'h-[36px] flex items-center px-[12px] hover:bg-dark-300 hover:text-primary-500',
              }}
            />
          </div>
        </div>
        <div
          className={
            'from-background pointer-events-none absolute right-0 left-0 h-8 bg-linear-to-b from-10% to-transparent'
          }
        />
      </div>

      {users.isError && (
        <Typography variant={'regular_14'} className={'text-danger-500'}>
          Something went wrong
        </Typography>
      )}

      {showLoading && (
        <div className={'flex justify-center py-12'}>
          <Loading />
        </div>
      )}

      {showEmptyFilters && (
        <div className={'grid place-items-center gap-4 py-12 text-center'}>
          <Typography variant={'h2'} className={'text-light-100'}>
            No users found
          </Typography>
          <Typography variant={'h3'} className={'text-dark-100'}>
            Try your search or filter criteria
          </Typography>
        </div>
      )}

      {!showLoading && !showEmptyFilters && users.data && users.data.items.length > 0 && (
        <>
          <div
            className={`transition-opacity duration-200 ${
              users.isFetching ? 'opacity-60' : 'opacity-100'
            }`}
          >
            <UsersTable
              items={users.data.items}
              sort={sort}
              onSort={handleSortWithCallback}
              onUserActionComplete={handleRefetch}
              isFetching={users.isFetching}
            />
          </div>

          <Pagination
            currentPage={users.data.page}
            totalItems={users.data.totalCount}
            itemsPerPage={users.data.pageSize}
            onPageChange={handlePageChangeWithCallback}
            onItemsPerPageChange={handleItemsPerPageChangeWithCallback}
            pageSizeOptions={USERS_PAGE_SIZE_OPTIONS}
          />
        </>
      )}
    </div>
  )
}
