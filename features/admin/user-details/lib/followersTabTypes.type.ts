import { SortDirection } from '@/shared/api/graphql/gql/graphql'

export type FollowersSortBy = 'userName' | 'createdAt'

export type FollowersSortState = {
  key: FollowersSortBy | null
  direction: SortDirection | null
}
