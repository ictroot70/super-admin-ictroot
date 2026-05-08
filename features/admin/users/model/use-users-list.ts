

"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useGqlQuery } from "@/shared/api/graphql";
import {
  GetUsersDocument,
  GetUsersQuery,
  GetUsersQueryVariables,
  SortDirection,
} from "@/shared/api/graphql/gql/graphql";

import {
  FilterValue,
  SortValue,
  UsersSortBy,
  UsersSortState,
  UsersViewModel,
} from ".";
import { useDebounce } from "../utils/useDebounce";
// import { UserBlockStatus } from "@/entities/admin/user"; // 🔥 Закомментировано, пока нет в схеме

export const USERS_PAGE_SIZE_OPTIONS = [8, 16, 32];

export function useUsersList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState<SortValue>("createdAt_desc");
  const [filterStatus, setFilterStatus] = useState<FilterValue>("ALL");

  const debouncedSearch = useDebounce(searchTerm, 300);


  const prevFiltersRef = useRef({ debouncedSearch, sortValue, filterStatus, pageSize });

  useEffect(() => {
    const prev = prevFiltersRef.current;
    const hasChanges =
      prev.debouncedSearch !== debouncedSearch ||
      prev.sortValue !== sortValue ||
      prev.filterStatus !== filterStatus ||
      prev.pageSize !== pageSize;

    if (hasChanges) {
      setPage(1);
    }
    prevFiltersRef.current = { debouncedSearch, sortValue, filterStatus, pageSize };
  }, [debouncedSearch, sortValue, filterStatus, pageSize]);

  const [sortField, sortDirection] = useMemo(() => {
    const [field, direction] = sortValue.split("_") as [UsersSortBy, SortDirection];
    const mappedField = field === UsersSortBy.USER_NAME ? "userName" : field;
    return [mappedField, direction];
  }, [sortValue]);


  const variables: GetUsersQueryVariables = useMemo(() => {
    const vars: GetUsersQueryVariables = {
      pageNumber: page,
      pageSize: pageSize,
      sortBy: sortField,
      sortDirection,
      // 🔥 statusFilter закомментирован — раскомментируйте после `pnpm codegen`, когда поле появится в схеме
      // statusFilter: filterStatus as UserBlockStatus,
    };

    const trimmedSearch = debouncedSearch.trim();
    if (trimmedSearch) {
      vars.searchTerm = trimmedSearch;
    }

    return vars;
  }, [page, pageSize, debouncedSearch, sortField, sortDirection, filterStatus]);

  const { data, loading, error, refetch } = useGqlQuery<
    GetUsersQuery,
    GetUsersQueryVariables
  >(GetUsersDocument, {
    variables,
    fetchPolicy: "cache-first",
    returnPartialData: true,
    nextFetchPolicy: "cache-first",
  });

  const { items, totalCount, pagesCount, currentPage, currentPageSize } = useMemo(() => {
    const usersData = data?.getUsers;

    if (!usersData) {
      return {
        items: [],
        totalCount: 0,
        pagesCount: 1,
        currentPage: 1,
        currentPageSize: pageSize,
      };
    }

    const viewModelItems: UsersViewModel[] = usersData.users.map((user) => ({
      userId: user.id ?? 0,
      username: user.userName ?? "Unknown",
      email: user.email ?? "",
      profileLink: `/profile/${user.userName ?? "unknown"}`,
      dateAdded: user.createdAt ?? "",
      isBlocked: user.userBan !== null && user.userBan !== undefined,
    }));

    return {
      items: viewModelItems,
      totalCount: usersData.pagination?.totalCount ?? 0,
      pagesCount: usersData.pagination?.pagesCount ?? 1,
      currentPage: usersData.pagination?.page ?? 1,
      currentPageSize: usersData.pagination?.pageSize ?? pageSize,
    };
  }, [data, pageSize]);

  // Флаг для UI: есть ли активные фильтры
  const hasActiveFilters = useMemo(() => {
    return debouncedSearch.trim().length > 0 || filterStatus !== "ALL";
  }, [debouncedSearch, filterStatus]);

  const sort: UsersSortState = useMemo(
    () => ({
      key: sortField as UsersSortBy,
      direction: sortDirection,
    }),
    [sortField, sortDirection],
  );

  const handleSort = useCallback((key: UsersSortBy) => {
    setSortValue((prev) => {
      const [currentField] = prev.split("_");
      const isSameField = currentField === key;
      const newDirection: SortDirection =
        isSameField && sortDirection === "asc" ? "desc" : "asc";
      return `${key}_${newDirection}`;
    });
  }, [sortDirection]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleItemsPerPageChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setFilterStatus("ALL");
  }, []);

  return useMemo(() => ({
    users: {
      data: {
        items,
        page: currentPage,
        pageSize: currentPageSize,
        totalCount,
        totalPages: pagesCount,
        hasActiveFilters,
      },
      isLoading: loading,
      isError: !!error,
    },
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
  }), [
    items,
    currentPage,
    currentPageSize,
    totalCount,
    pagesCount,
    hasActiveFilters,
    loading,
    error,
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
  ]);
}