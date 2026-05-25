import { UsersSortBy } from './enums'

export type UsersSortDirection = 'asc' | 'desc'
export type FilterValue = 'ALL' | 'BLOCKED' | 'UNBLOCKED'
export type SortValue = `${UsersSortBy}_${UsersSortDirection}`

export interface UsersSortState {
  key: UsersSortBy | null
  direction: UsersSortDirection | null
}

export interface UsersViewModel {
  userId: number
  username: string
  profileLink: string
  profileUrl: string
  dateAdded: string
  isBlocked: boolean
}

export interface UsersDataResponse {
  items: UsersViewModel[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasActiveFilters: boolean
}
