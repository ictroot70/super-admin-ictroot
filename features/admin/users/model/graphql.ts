// 🔹 v4: gql из core
import { gql } from '@apollo/client/core'

export const GET_USERS = gql`
  query GetUsers(
    $page: Int!
    $pageSize: Int!
    $search: String
    $sort: String
    $filter: String
  ) {
    users(
      page: $page
      pageSize: $pageSize
      search: $search
      sort: $sort
      filter: $filter
    ) {
      items {
        id
        name
        email
        status
        createdAt
      }
      totalCount
      page
      pageSize
    }
  }
`

export type UserStatus = 'ACTIVE' | 'BLOCKED'
export type FilterValue = 'ALL' | 'BLOCKED' | 'UNBLOCKED'
export type SortValue = 'createdAt_asc' | 'createdAt_desc' | 'name_asc' | 'name_desc'

export interface UserListItem {
  id: number // 🔹 Исправлено: number вместо string
  name: string
  email: string
  status: UserStatus
  createdAt: string
}