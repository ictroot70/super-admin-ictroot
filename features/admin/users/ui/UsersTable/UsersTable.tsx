// // import React from 'react'

// // import {
// //   SortableHeaderCell,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeaderCell,
// //   TableRow,
// // } from '@/shared/composites/Table'
// // import { formatDate } from '@/shared/lib/formatters'

// // import s from './UsersTable.module.scss'
// // import { getUserStatusBadgeClass, mapUserStatusToLabel, UsersSortBy, UsersSortState } from '../../model'

// // // 🔹 ViewModel для строки таблицы
// // export interface UsersViewModel {
// //   userId: number
// //   username: string
// //   email: string
// //   profileLink: string
// //   dateAdded: string
// //   isBlocked: boolean
// // }

// // type Column = {
// //   id: string
// //   title: string
// //   sortKey?: UsersSortBy
// // }

// // const columns: Column[] = [
// //   { id: 'userId', title: 'User ID', sortKey: UsersSortBy.CREATED_AT },
// //   { id: 'username', title: 'Username', sortKey: UsersSortBy.USER_NAME },
// //   { id: 'email', title: 'Email', sortKey: UsersSortBy.EMAIL },
// //   { id: 'dateAdded', title: 'Date Added', sortKey: UsersSortBy.CREATED_AT },
// //   { id: 'status', title: 'Status', sortKey: UsersSortBy.STATUS },
// //   { id: 'actions', title: '' },
// // ]

// // type Props = {
// //   sort: UsersSortState
// //   items: UsersViewModel[]
// //   onSort: (key: UsersSortBy) => void
// // }

// // export function UsersTable({ items, sort, onSort }: Props) {
// //   return (
// //     <div className={s.wrapper}>
// //       <Table>
// //         <TableHead>
// //           <TableRow>
// //             {columns.map(column =>
// //               column.sortKey ? (
// //                 <SortableHeaderCell
// //                   key={column.id}
// //                   columnKey={column.sortKey}
// //                   title={column.title}
// //                   activeKey={sort.key ?? undefined}
// //                   direction={sort.direction}
// //                   onSort={onSort}
// //                 />
// //               ) : (
// //                 <TableHeaderCell key={column.id} scope={'col'}>
// //                   {column.title}
// //                 </TableHeaderCell>
// //               )
// //             )}
// //           </TableRow>
// //         </TableHead>
// //         <TableBody>
// //           {items.map(item => (
// //             <TableRow key={item.userId}>
// //               {/* User ID + blocked indicator */}
// //               <TableCell>
// //                 <div className={s.userIdCell}>
// //                   {item.isBlocked && <span className={s.blockedIcon}>🚫</span>}
// //                   <span>{item.userId}</span>
// //                 </div>
// //               </TableCell>

// //               {/* Username with link */}
// //               <TableCell>
// //                 <a href={item.profileLink} className={s.usernameLink} target="_blank" rel="noopener noreferrer">
// //                   {item.username}
// //                 </a>
// //               </TableCell>

// //               {/* Email */}
// //               <TableCell>{item.email}</TableCell>

// //               {/* Date Added */}
// //               <TableCell>{formatDate(item.dateAdded)}</TableCell>

// //               {/* Status Badge */}
// //               <TableCell>
// //                 <span className={`${s.statusBadge} ${getUserStatusBadgeClass(item.isBlocked)}`}>
// //                   {mapUserStatusToLabel(item.isBlocked)}
// //                 </span>
// //               </TableCell>

// //               {/* Actions Menu */}
// //               <TableCell>
// //                 <button className={s.actionsButton} aria-label="User actions">
// //                   ⋮
// //                 </button>
// //               </TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </div>
// //   )
// // }

// import React from 'react'

// import {
//   SortableHeaderCell,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeaderCell,
//   TableRow,
// } from '@/shared/composites/Table'
// import { formatDate } from '@/shared/lib/formatters'

// import s from './UsersTable.module.scss'
// import { UsersSortBy, UsersSortState, getUserStatusBadgeClass, mapUserStatusToLabel } from '../../model'

// export interface UsersViewModel {
//   userId: number
//   username: string
//   email: string
//   profileLink: string
//   dateAdded: string
//   isBlocked: boolean
// }

// type Column = {
//   id: string
//   title: string
//   sortKey?: UsersSortBy
// }

// const columns: Column[] = [
//   { id: 'userId', title: 'User ID', sortKey: UsersSortBy.CREATED_AT },
//   { id: 'username', title: 'Username', sortKey: UsersSortBy.USER_NAME },
//   { id: 'email', title: 'Email', sortKey: UsersSortBy.EMAIL },
//   { id: 'dateAdded', title: 'Date Added', sortKey: UsersSortBy.CREATED_AT },
//   { id: 'status', title: 'Status', sortKey: UsersSortBy.STATUS },
//   { id: 'actions', title: '' },
// ]

// type Props = {
//   sort: UsersSortState
//   items: UsersViewModel[]
//   onSort: (key: UsersSortBy) => void
// }

// export function UsersTable({ items, sort, onSort }: Props) {
//   return (
//     <div className={s.wrapper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {columns.map((column) =>
//               column.sortKey ? (
//                 <SortableHeaderCell
//                   key={column.id}
//                   columnKey={column.sortKey}
//                   title={column.title}
//                   activeKey={sort.key ?? undefined}
//                   direction={sort.direction}
//                   onSort={onSort}
//                 />
//               ) : (
//                 <TableHeaderCell key={column.id} scope="col">
//                   {column.title}
//                 </TableHeaderCell>
//               )
//             )}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {items.map((item) => (
//             <TableRow key={item.userId}>
//               <TableCell>
//                 <div className={s.userIdCell}>
//                   {item.isBlocked && <span className={s.blockedIcon}>🚫</span>}
//                   <span>{item.userId}</span>
//                 </div>
//               </TableCell>
//               <TableCell>
//                 <a href={item.profileLink} className={s.usernameLink} target="_blank" rel="noopener noreferrer">
//                   {item.username}
//                 </a>
//               </TableCell>
//               <TableCell>{item.email}</TableCell>
//               <TableCell>{formatDate(item.dateAdded)}</TableCell>
//               <TableCell>
//                 <span className={`${s.statusBadge} ${getUserStatusBadgeClass(item.isBlocked)}`}>
//                   {mapUserStatusToLabel(item.isBlocked)}
//                 </span>
//               </TableCell>
//               <TableCell>
//                 <button className={s.actionsButton} aria-label="User actions">
//                   ⋮
//                 </button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }



import React from 'react'
import {
  SortableHeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/shared/composites/Table'
import { formatDate } from '@/shared/lib/formatters'
import s from './UsersTable.module.scss'
import { UsersSortBy, UsersSortState, getUserStatusBadgeClass, mapUserStatusToLabel } from '../../model'

export interface UsersViewModel {
  userId: number
  username: string
  email: string
  profileLink: string
  dateAdded: string
  isBlocked: boolean
}

type Column = {
  id: string
  title: string
  sortKey?: UsersSortBy
}

const columns: Column[] = [
  { id: 'userId', title: 'User ID', sortKey: UsersSortBy.CREATED_AT },
  { id: 'username', title: 'Username', sortKey: UsersSortBy.USER_NAME },
  { id: 'email', title: 'Email', sortKey: UsersSortBy.EMAIL },
  { id: 'dateAdded', title: 'Date Added', sortKey: UsersSortBy.CREATED_AT },
  { id: 'status', title: 'Status', sortKey: UsersSortBy.STATUS },
  { id: 'actions', title: '' },
]

type Props = {
  sort: UsersSortState
  items: UsersViewModel[]
  onSort: (key: UsersSortBy) => void
}

export function UsersTable({ items, sort, onSort }: Props) {
  return (
    <div className={s.wrapper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) =>
              column.sortKey ? (
                <SortableHeaderCell
                  key={column.id}
                  columnKey={column.sortKey}
                  title={column.title}
                  activeKey={sort.key ?? undefined}
                  direction={sort.direction}
                  onSort={onSort}
                />
              ) : (
                <TableHeaderCell key={column.id} scope="col">
                  {column.title}
                </TableHeaderCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow key={item.userId}>
                <TableCell>
                  <div className={s.userIdCell}>
                    {item.isBlocked && <span className={s.blockedIcon}>🚫</span>}
                    <span>{item.userId}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <a href={item.profileLink} className={s.usernameLink} target="_blank" rel="noopener noreferrer">
                    {item.username}
                  </a>
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{formatDate(item.dateAdded)}</TableCell>
                <TableCell>
                  <span className={`${s.statusBadge} ${getUserStatusBadgeClass(item.isBlocked)}`}>
                    {mapUserStatusToLabel(item.isBlocked)}
                  </span>
                </TableCell>
                <TableCell>
                  <button className={s.actionsButton} aria-label="User actions">
                    ⋮
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className={s.emptyRow}>
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}