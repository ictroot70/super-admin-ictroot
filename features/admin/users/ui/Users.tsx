// // features/admin/users/ui/Users.tsx
// 'use client'

// import React from 'react'


// import { useUsersList } from '../model/use-users-list'
// import {
//   FilterValue,
//   SortValue,
//   UsersSortBy,
//   UsersSortState,
//   USERS_PAGE_SIZE_OPTIONS,
// } from '../model'

// import s from './Users.module.scss'
// import { Pagination, Typography } from '@ictroot/ui-kit'
// import { Loading } from '@/shared/ui/Loading'
// import { UsersTable } from './UsersTable'

// export function Users() {
//   const { users, loading, error, pagination, filters, handlers } = useUsersList()

//   // 🔹 Обработка ошибки
//   if (error) {
//     return (
//       <div className={s.state}>
//         <div className={s.error}>
//           ❌ Ошибка: {error.message}
//           <button onClick={() => handlers.refetch()}>Повторить</button>
//         </div>
//       </div>
//     )
//   }

//   // 🔹 Состояние загрузки
//   if (loading && users.length === 0) {
//     return (
//       <div className={s.state}>
//         <Loading />
//       </div>
//     )
//   }

//   // 🔹 Пустой список
//   if (!users || users.length === 0) {
//     return (
//       <div className={s.state}>
//         <Typography variant="h1">Пользователи не найдены</Typography>
//       </div>
//     )
//   }

//   // 🔹 Маппинг сортировки для таблицы
//   const sortState: UsersSortState = {
//     key: (filters.sort.split('_')[0] as UsersSortBy) || null,
//     direction: (filters.sort.split('_')[1] as 'asc' | 'desc') || 'desc',
//   }

//   const handleSort = (key: UsersSortBy) => {
//     const newDirection =
//       sortState.key === key && sortState.direction === 'asc' ? 'desc' : 'asc'
//     handlers.setSort(`${key}_${newDirection}` as SortValue)
//   }

//   return (
//     <div className={s.wrapper}>
//       {/* 🔍 Поиск и фильтры */}
//       <div className={s.controls}>
//         <input
//           type="search"
//           placeholder="Поиск по имени или email..."
//           value={filters.searchTerm}
//           onChange={(e) => handlers.setSearchTerm(e.target.value)}
//           className={s.searchInput}
//         />


//       </div>

//       {/* 📊 Таблица */}
//       <UsersTable items={users} sort={sortState} onSort={handleSort} />

//       {/* 📄 Пагинация */}
//       <Pagination
//         currentPage={pagination.page}
//         totalItems={pagination.totalCount}
//         itemsPerPage={pagination.pageSize}
//         onPageChange={handlers.setPage}
//         onItemsPerPageChange={handlers.setPageSize}
//         pageSizeOptions={USERS_PAGE_SIZE_OPTIONS}
//       />
//     </div>
//   )
// }


'use client'

import React from 'react'


import s from './Payments.module.scss'

import { PaymentsTable } from './PaymentsTable'
import { Loading } from '@/shared/ui/Loading'
import { Typography, Pagination } from '@ictroot/ui-kit'

export function Payments() {
  const { payments, sort, handleSort, handlePageChange, handleItemsPerPageChange } =
    usePaymentsTable()

  if (payments.isLoading) {
    return <Loading />
  }

  if (payments.isError) {
    return (
      <div className={s.state}>
        <Typography variant={'h1'}>{'Failed to load payments'}</Typography>
      </div>
    )
  }

  const data = payments.data

  if (!data || data.items.length === 0) {
    return (
      <div className={s.state}>
        <Typography variant={'h1'}>{'No payments yet'}</Typography>
      </div>
    )
  }

  const { items, page, totalCount, pageSize } = data

  return (
    <div className={s.wrapper}>
      <PaymentsTable items={items} sort={sort} onSort={handleSort} />
      <Pagination
        currentPage={page}
        totalItems={totalCount}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        pageSizeOptions={PAYMENTS_PAGE_SIZE_OPTIONS}
      />
    </div>
  )
}
