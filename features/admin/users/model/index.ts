// features/admin/users/model/index.ts

// 🔹 Типы сортировки
export enum UsersSortBy {
  CREATED_AT = 'createdAt',
  USER_NAME = 'userName',
  EMAIL = 'email',
  STATUS = 'status',
}

export type UsersSortDirection = 'asc' | 'desc'

export type UsersSortState = {
  key: UsersSortBy | null
  direction: UsersSortDirection
}

// 🔹 Типы фильтров
export type FilterValue = 'ALL' | 'BLOCKED' | 'UNBLOCKED'
export type SortValue = `${UsersSortBy}_${UsersSortDirection}`

// 🔹 Хелпер: статус → человекочитаемая метка
export const mapUserStatusToLabel = (isBlocked: boolean): string => {
  return isBlocked ? 'Заблокирован' : 'Активен'
}

// 🔹 Хелпер: статус → цвет бейджа
export const getUserStatusBadgeClass = (isBlocked: boolean): string => {
  return isBlocked
    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
}

// 🔹 Опции для пагинации
export const USERS_PAGE_SIZE_OPTIONS = [4, 8, 12, 20]