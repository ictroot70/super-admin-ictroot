import { SortDirection } from '@/shared/api/graphql/gql/graphql'

export type UserRelationshipsSortBy = 'userName' | 'createdAt'

export type UserRelationshipsSortState = {
  key: UserRelationshipsSortBy | null
  direction: SortDirection | null
}

export type UserRelationshipItem = {
  id: number
  userId: number
  userName: string | null
  firstName: string | null
  lastName: string | null
  createdAt: string
}

export type UserRelationshipsConnection = {
  page: number
  pageSize: number
  totalCount: number
  items: UserRelationshipItem[]
}
