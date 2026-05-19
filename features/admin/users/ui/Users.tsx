'use client'

import { Loading } from '@/shared/composites'
import { Pagination } from '@/shared/ui'

import { useUsersList, USERS_PAGE_SIZE_OPTIONS } from '../model'
import { Controls } from './Controls/Controls'
import { EmptyFiltersState } from './EmptyState/EmptyFiltersState'
import { EmptyState } from './EmptyState/EmptyState'
import { ErrorState } from './ErrorState/ErrorState'
import { PageContainer } from './PageContainer/PageContainer'
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
    handleClearFilters,
    setSearchTerm,
    setFilterStatus,
    refetch,
  } = useUsersList()

  if (users.isInitialLoading) {
    return <Loading />
  }

  if (users.isError && !users.data?.items.length && !users.isFetching) {
    return <ErrorState onRetry={refetch} />
  }

  const isEmpty = !users.data?.items.length
  const hasActiveFilters = users.data?.hasActiveFilters ?? false

  if (isEmpty && !users.isFetching) {
    if (hasActiveFilters) {
      return (
        <EmptyFiltersState
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          onClearFilters={handleClearFilters}
        />
      )
    }

    return <EmptyState />
  }

  return (
    <PageContainer>
      <Controls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      <div
        className={`transition-opacity duration-200 ${
          users.isFetching ? 'pointer-events-none opacity-60' : 'opacity-100'
        }`}
      >
        <UsersTable
          items={users.data?.items || []}
          sort={sort}
          onSort={handleSort}
          onUserActionComplete={refetch}
          isFetching={users.isFetching}
        />
      </div>

      {users.data && users.data.totalCount > 0 && (
        <Pagination
          currentPage={users.data.page}
          totalItems={users.data.totalCount}
          itemsPerPage={users.data.pageSize}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          pageSizeOptions={USERS_PAGE_SIZE_OPTIONS}
        />
      )}
    </PageContainer>
  )
}
