"use client";

import React from "react";
import s from "./Users.module.scss";
import { Button, Pagination, Typography } from "@/shared/ui";
import { UsersTable } from "./UsersTable/UsersTable";
import { Loading } from "@/shared/composites";
import { FilterValue, USERS_PAGE_SIZE_OPTIONS } from "../model";
import { useUsersList } from "../model/use-users-list";

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
    return (
      <div className={s.state}>
        <Typography variant={"h1"}>Failed to load users</Typography>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  const { items, page, totalCount, pageSize, hasActiveFilters } = users.data;

  if (items.length === 0 && hasActiveFilters) {
    return (
      <div className={s.wrapper}>
        <div className={s.controls}>
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={s.searchInput}
            aria-label="Search users"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterValue)}
            className={s.filterSelect}
            aria-label="Filter by status"
          >
            <option value="ALL">Not Selected</option>
            <option value="BLOCKED">Blocked</option>
            <option value="UNBLOCKED">Not Blocked</option>
          </select>
        </div>
        <div className={s.emptyState}>
          <Typography variant="h2">No users found</Typography>
          <Typography variant="h3" className={s.emptyStateSubtitle}>
            Try adjusting your search or filter criteria
          </Typography>
          <Button variant="primary" onClick={handleClearFilters}>
            Clear filters
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={s.state}>
        <Typography variant={"h1"}>No users yet</Typography>
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <div className={s.controls}>
        <input
          type="search"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={s.searchInput}
          aria-label="Search users"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterValue)}
          className={s.filterSelect}
          aria-label="Filter by status"
        >
          <option value="ALL">Not Selected</option>
          <option value="BLOCKED">Blocked</option>
          <option value="UNBLOCKED">Not Blocked</option>
        </select>
      </div>
      <UsersTable items={items} sort={sort} onSort={handleSort} />
      <Pagination
        currentPage={page}
        totalItems={totalCount}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        pageSizeOptions={USERS_PAGE_SIZE_OPTIONS}
      />
    </div>
  );
}
