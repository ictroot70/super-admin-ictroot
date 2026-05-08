// Источник: GraphQL introspection schema

export type Avatar = {
  url: string | null
  width: number | null
  height: number | null
  fileSize: number | null
}

export type Profile = {
  id: number
  userName: string | null
  firstName: string | null
  lastName: string | null
  city: string | null
  country: string | null
  region: string | null
  dateOfBirth: string | null
  aboutMe: string | null
  createdAt: string // NON_NULL
  avatars: Avatar[]
}

export type UserBan = {
  reason: string // NON_NULL
  createdAt: string // NON_NULL
}

export type User = {
  id: number // NON_NULL
  userName: string // NON_NULL
  email: string // NON_NULL
  createdAt: string // NON_NULL
  profile: Profile // NON_NULL
  userBan: UserBan | null // nullable — Ban/Unban в меню зависит от этого поля
}

// Все строковые поля кроме id и createdAt — nullable
// Обязателен fallback в UI (раздел 5.9 плана)
export type Follow = {
  id: number // NON_NULL
  userId: number // NON_NULL
  userName: string | null
  firstName: string | null
  lastName: string | null
  createdAt: string // NON_NULL
}

export type PaginationModel = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
}

export type UsersPaginationModel = {
  users: User[]
  pagination: PaginationModel // вложенный объект, не flat!
}

export type FollowPaginationModel = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: Follow[]
}

export type SortDirection = 'asc' | 'desc'
export type UserBlockStatus = 'ALL' | 'BLOCKED' | 'UNBLOCKED'
