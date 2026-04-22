// features/admin/users/ui/UsersTable.tsx
'use client'

import React, { useState } from 'react'


import {
  UsersSortBy,
  UsersSortState,
} from '../model'
import type { UserListItem } from '../model/graphql'

import s from './UsersTable.module.scss'

// 🔹 Тип для выпадающего меню
type UserAction = 'delete' | 'unban' | 'info'

type UserMenuProps = {
  user: UserListItem
  onDelete: (userId: number) => void
  onUnban: (userId: number) => void
  onInfo: (userId: number) => void
}

// 🔹 Компонент меню действий пользователя
function UserActionsMenu({ user, onDelete, onUnban, onInfo }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={s.menuContainer}>
      <button
        className={s.menuButton}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="13" r="1.5" />
        </svg>
      </button>

      {isOpen && (
        <div className={s.menuDropdown}>
          <button
            className={s.menuItem}
            onClick={() => {
              onDelete(user.id)
              setIsOpen(false)
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11 3h-2V2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1H5a1 1 0 0 0-1 1v1h8V4a1 1 0 0 0-1-1zm-6 3v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6H5z" />
            </svg>
            Delete User
          </button>

          {user.isBlocked && (
            <button
              className={s.menuItem}
              onClick={() => {
                onUnban(user.id)
                setIsOpen(false)
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a3 3 0 0 1 3 3v2H5V4a3 3 0 0 1 3-3zm0 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
              </svg>
              Un-ban User
            </button>
          )}

          <button
            className={s.menuItem}
            onClick={() => {
              onInfo(user.id)
              setIsOpen(false)
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm1-11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 3a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0V8z" />
            </svg>
            More Information
          </button>
        </div>
      )}
    </div>
  )
}

type Column = {
  id: string
  title: string
  sortKey?: UsersSortBy
}

const columns: Column[] = [
  { id: 'id', title: 'User ID', sortKey: UsersSortBy.ID },
  { id: 'profileLink', title: 'Profile link', sortKey: UsersSortBy.USER_NAME },
  { id: 'username', title: 'Username', sortKey: UsersSortBy.USER_NAME },
  { id: 'dateAdded', title: 'Date added', sortKey: UsersSortBy.CREATED_AT },
  { id: 'actions', title: '' },
]

type Props = {
  items: UserListItem[]
  sort: UsersSortState
  onSort: (key: UsersSortBy) => void
  onDeleteUser: (userId: number) => void
  onUnbanUser: (userId: number) => void
  onShowInfo: (userId: number) => void
}

export function UsersTable({
  items,
  sort,
  onSort,
  onDeleteUser,
  onUnbanUser,
  onShowInfo
}: Props) {
  return (
    <div className={s.wrapper}>
      <Table className={s.table}>
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
          {items.map((user) => (
            <TableRow key={user.id}>
              <TableCell className={s.userId}>
                {user.isBlocked && (
                  <svg className={s.banIcon} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13A6 6 0 1 1 8 2a6 6 0 0 1 0 12z" />
                    <path d="M4.293 4.293a1 1 0 0 1 1.414 0L8 6.586l2.293-2.293a1 1 0 1 1 1.414 1.414L9.414 8l2.293 2.293a1 1 0 0 1-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L6.586 8 4.293 5.707a1 1 0 0 1 0-1.414z" />
                  </svg>
                )}
                {user.id}
              </TableCell>

              <TableCell className={s.profileLink}>
                {user.userName.replace(/\s+/g, '_')}
              </TableCell>

              <TableCell className={s.username}>
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.userName}
              </TableCell>

              <TableCell className={s.date}>
                {new Date(user.createdAt).toLocaleDateString('ru-RU')}
              </TableCell>

              <TableCell className={s.actions}>
                <UserActionsMenu
                  user={user}
                  onDelete={onDeleteUser}
                  onUnban={onUnbanUser}
                  onShowInfo={onShowInfo}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}