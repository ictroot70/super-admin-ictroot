// "use client";

// import { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import { useQuery } from "@apollo/client/react";
// import { GET_USERS, UserListItem, GetUsersResponse } from "./graphql"; // Путь к вашему GraphQL файлу
// import { SortDirection } from "@/entities/admin/user"; // Проверьте этот импорт
// import {
//   FilterValue,
//   SortValue,
//   UsersSortBy,
//   UsersSortState,
//   UsersViewModel,
//   UsersDataResponse,
// } from ".";
// import { useDebounce } from "../utils/useDebounce"; // Путь к утилите

// export function useUsersList() {
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(8);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortValue, setSortValue] = useState<SortValue>("createdAt_desc");
//   const [filterStatus, setFilterStatus] = useState<FilterValue>("ALL");

//   const prevDepsRef = useRef<string>("");
//   const debouncedSearch = useDebounce(searchTerm, 500);

//   useEffect(() => {
//     const depsKey = `${debouncedSearch}-${sortValue}-${filterStatus}-${pageSize}`;
//     if (prevDepsRef.current && prevDepsRef.current !== depsKey) {
//       setPage(1);
//     }
//     prevDepsRef.current = depsKey;
//   }, [debouncedSearch, sortValue, filterStatus, pageSize]);

//   const [sortField, sortDirection] = useMemo(() => {
//     const [field, direction] = sortValue.split("_") as [
//       UsersSortBy,
//       SortDirection,
//     ];
//     const mappedField = field === UsersSortBy.USER_NAME ? "userName" : field;
//     return [mappedField, direction];
//   }, [sortValue]);

//   const isEmailSearch = debouncedSearch.trim().includes("@");

//   const variables = useMemo(
//     () => ({
//       pageNumber: page,
//       pageSize: isEmailSearch ? 100 : pageSize,
//       searchTerm: isEmailSearch
//         ? undefined
//         : debouncedSearch.trim() || undefined,
//       sortBy: sortField,
//       sortDirection,
//     }),
//     [page, pageSize, debouncedSearch, sortField, sortDirection, isEmailSearch],
//   );

//   const { data, loading, error, refetch } = useQuery<GetUsersResponse>(
//     GET_USERS,
//     {
//       variables,
//       fetchPolicy: "cache-and-network",
//     },
//   );

//   const { items, hasActiveFilters } = useMemo(() => {
//     const rawUsers = data?.getUsers?.users || [];
//     const searchTrimmed = debouncedSearch.trim().toLowerCase();

//     let filtered = rawUsers.filter((user: UserListItem) => {
//       const isBlocked = user.userBan !== null && user.userBan !== undefined;
//       if (filterStatus === "ALL") return true;
//       return filterStatus === "BLOCKED" ? isBlocked : !isBlocked;
//     });

//     if (searchTrimmed) {
//       if (isEmailSearch) {
//         filtered = filtered.filter((user: UserListItem) =>
//           user.email?.toLowerCase().includes(searchTrimmed),
//         );
//       } else {
//         filtered = filtered.filter((user: UserListItem) => {
//           const emailMatch = user.email?.toLowerCase().includes(searchTrimmed);
//           const usernameMatch = user.userName
//             ?.toLowerCase()
//             .includes(searchTrimmed);
//           return emailMatch || usernameMatch;
//         });
//       }
//     }

//     const viewModelItems: UsersViewModel[] = filtered.map(
//       (user: UserListItem) => ({
//         userId: user.id,
//         username: user.userName,
//         email: user.email,
//         profileLink: `/profile/${user.userName}`,
//         dateAdded: user.createdAt,
//         isBlocked: user.userBan !== null,
//       }),
//     );

//     const hasActiveFilters =
//       debouncedSearch.trim().length > 0 || filterStatus !== "ALL";

//     return { items: viewModelItems, hasActiveFilters };
//   }, [data, filterStatus, debouncedSearch, isEmailSearch]);

//   const pagination = data?.getUsers?.pagination || {
//     page: 1,
//     pageSize: 8,
//     totalCount: 0,
//     pagesCount: 1,
//   };

//   const totalPages = pagination.pagesCount > 0 ? pagination.pagesCount : 1;

//   const sort: UsersSortState = useMemo(
//     () => ({
//       key: sortField as UsersSortBy,
//       direction: sortDirection,
//     }),
//     [sortField, sortDirection],
//   );

//   const handleSort = useCallback(
//     (key: UsersSortBy) => {
//       setSortValue((prev) => {
//         const [currentField] = prev.split("_");
//         const isSameField = currentField === key;
//         const newDirection: SortDirection =
//           isSameField && sortDirection === "asc" ? "desc" : "asc";
//         return `${key}_${newDirection}`;
//       });
//     },
//     [sortDirection],
//   );

//   const handlePageChange = useCallback(
//     (newPage: number) => setPage(newPage),
//     [],
//   );

//   const handleItemsPerPageChange = useCallback((newPageSize: number) => {
//     setPageSize(newPageSize);
//     setPage(1);
//   }, []);

//   const handleClearFilters = useCallback(() => {
//     setSearchTerm("");
//     setFilterStatus("ALL");
//     setPage(1);
//   }, []);

//   return {
//     users: {
//       data:
//         items.length > 0 || !loading
//           ? {
//               items,
//               page: pagination.page,
//               pageSize: pagination.pageSize,
//               totalCount: pagination.totalCount,
//               totalPages,
//               hasActiveFilters,
//             }
//           : null,
//       isLoading: loading,
//       isError: !!error,
//     },
//     sort,
//     searchTerm,
//     filterStatus,
//     handleSort,
//     handlePageChange,
//     handleItemsPerPageChange,
//     handleClearFilters,
//     setSearchTerm,
//     setFilterStatus,
//     refetch,
//   };
// }
 "use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
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

export function useUsersList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState<SortValue>("createdAt_desc");
  const [filterStatus, setFilterStatus] = useState<FilterValue>("ALL");

  const prevDepsRef = useRef<string>("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Сброс страницы на 1 при изменении фильтров или поиска
  useEffect(() => {
    const depsKey = `${debouncedSearch}-${sortValue}-${filterStatus}-${pageSize}`;
    if (prevDepsRef.current && prevDepsRef.current !== depsKey) {
      setPage(1);
    }
    prevDepsRef.current = depsKey;
  }, [debouncedSearch, sortValue, filterStatus, pageSize]);

  // Парсинг строки сортировки (например, "userName_asc") в поле и направление
  const [sortField, sortDirection] = useMemo(() => {
    const [field, direction] = sortValue.split("_") as [
      UsersSortBy,
      SortDirection,
    ];
    // Маппинг enum значения на реальное имя поля в API, если отличается
    const mappedField = field === UsersSortBy.USER_NAME ? "userName" : field;
    return [mappedField, direction];
  }, [sortValue]);

  const isEmailSearch = debouncedSearch.trim().includes("@");

  const variables: GetUsersQueryVariables = useMemo(
    () => ({
      pageNumber: page,
      // Если поиск по email, загружаем больше данных для клиентской фильтрации, 
      // либо можно оставить pageSize, если бэкенд поддерживает точный поиск
      pageSize: isEmailSearch ? 100 : pageSize,
      searchTerm: isEmailSearch
        ? undefined
        : debouncedSearch.trim() || undefined,
      sortBy: sortField,
      sortDirection,
    }),
    [page, pageSize, debouncedSearch, sortField, sortDirection, isEmailSearch],
  );

  const { data, loading, error, refetch } = useGqlQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    {
      variables,
      fetchPolicy: "cache-and-network",
    },
  );

  const { items, hasActiveFilters } = useMemo(() => {
    const rawUsers = data?.getUsers?.users || [];
    const searchTrimmed = debouncedSearch.trim().toLowerCase();

    // 1. Фильтрация по статусу (Blocked/Unblocked)
    let filtered = rawUsers.filter((user) => {
      const isBlocked = user.userBan !== null && user.userBan !== undefined;
      if (filterStatus === "ALL") return true;
      return filterStatus === "BLOCKED" ? isBlocked : !isBlocked;
    });

    // 2. Клиентская фильтрация по поиску (если нужно)
    if (searchTrimmed) {
      if (isEmailSearch) {
        filtered = filtered.filter((user) =>
          user.email?.toLowerCase().includes(searchTrimmed),
        );
      } else {
        filtered = filtered.filter((user) => {
          const emailMatch = user.email?.toLowerCase().includes(searchTrimmed);
          const usernameMatch = user.userName
            ?.toLowerCase()
            .includes(searchTrimmed);
          return emailMatch || usernameMatch;
        });
      }
    }

    // 3. Маппинг в ViewModel
    const viewModelItems: UsersViewModel[] = filtered.map(
      (user) => ({
        userId: user.id,
        username: user.userName,
        email: user.email,
        profileLink: `/profile/${user.userName}`,
        // Благодаря настройке scalars в codegen.ts, createdAt теперь string
        dateAdded: user.createdAt as string, 
        isBlocked: user.userBan !== null,
      }),
    );

    const hasActiveFilters =
      debouncedSearch.trim().length > 0 || filterStatus !== "ALL";

    return { items: viewModelItems, hasActiveFilters };
  }, [data, filterStatus, debouncedSearch, isEmailSearch]);

  const pagination = data?.getUsers?.pagination || {
    page: 1,
    pageSize: 8,
    totalCount: 0,
    pagesCount: 1,
  };

  const totalPages = pagination.pagesCount > 0 ? pagination.pagesCount : 1;

  const sort: UsersSortState = useMemo(
    () => ({
      key: sortField as UsersSortBy,
      direction: sortDirection,
    }),
    [sortField, sortDirection],
  );

  const handleSort = useCallback(
    (key: UsersSortBy) => {
      setSortValue((prev) => {
        const [currentField] = prev.split("_");
        const isSameField = currentField === key;
        const newDirection: SortDirection =
          isSameField && sortDirection === "asc" ? "desc" : "asc";
        return `${key}_${newDirection}`;
      });
    },
    [sortDirection],
  );

  const handlePageChange = useCallback(
    (newPage: number) => setPage(newPage),
    [],
  );

  const handleItemsPerPageChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setFilterStatus("ALL");
    setPage(1);
  }, []);

    return {
    users: {
      data:
        items.length > 0 || !loading
          ? {
              items,
              page: pagination.page,
              pageSize: pagination.pageSize,
              totalCount: pagination.totalCount,
              totalPages,
              hasActiveFilters,
            }
          : null,
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
  };
}