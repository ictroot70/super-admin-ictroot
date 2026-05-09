"use client";

import { Loading } from "@/shared/composites";
import { Pagination } from "@/shared/ui";

import { useUsersList, USERS_PAGE_SIZE_OPTIONS } from "../model";
import { Controls } from "./Controls/Controls";
import { EmptyFiltersState } from "./EmptyState/EmptyFiltersState";
import { EmptyState } from "./EmptyState/EmptyState";
import { ErrorState } from "./ErrorState/ErrorState";
import { PageContainer } from "./PageContainer/PageContainer";
import { UsersTable } from "./UsersTable/UsersTable";

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
  } = useUsersList();

  if (users.isLoading) {
    return <Loading />;
  }

  if (users.isError || !users.data) {
    return <ErrorState />;
  }

  const { items, page, totalCount, pageSize, hasActiveFilters } = users.data;
  const isEmpty = items.length === 0;

  if (isEmpty) {
    if (hasActiveFilters) {
      return (
        <EmptyFiltersState
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          onClearFilters={handleClearFilters}
        />
      );
    }

    return <EmptyState />;
  }

  return (
    <PageContainer>
      <Controls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      <UsersTable items={items} sort={sort} onSort={handleSort} />

      <Pagination
        currentPage={page}
        totalItems={totalCount}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        pageSizeOptions={USERS_PAGE_SIZE_OPTIONS}
      />
    </PageContainer>
  );
}
