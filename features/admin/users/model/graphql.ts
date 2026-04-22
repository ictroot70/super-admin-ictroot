// shared/api/graphql/operations/queries/get-users.graphql.ts
import { gql } from '@apollo/client/core'

export const GET_USERS = gql`
  query GetUsers(
    $pageNumber: Int
    $pageSize: Int
    $searchTerm: String
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getUsers(
      pageNumber: $pageNumber
      pageSize: $pageSize
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      users {
        id
        userName
        email
        createdAt
        profile {
          firstName
          lastName
          __typename
        }
        userBan {
          reason
          createdAt
          __typename
        }
        __typename
      }
      pagination {
        page
        pageSize
        totalCount
        pagesCount
        __typename
      }
      __typename
    }
  }
`

// 🔹 Типы на основе вашей схемы
export type SortDirection = 'asc' | 'desc'
export type FilterValue = 'ALL' | 'BLOCKED' | 'UNBLOCKED'
export type SortValue = 'createdAt_desc' | 'createdAt_asc' | 'userName_desc' | 'userName_asc'

export interface UserListItem {
  id: number          // ✅ Int! → number
  userName: string    // ✅ String! → string
  email: string       // ✅ String! → string
  createdAt: string   // ✅ DateTime! → string (ISO)
  firstName: string | null  // ✅ Profile.firstName nullable
  lastName: string | null   // ✅ Profile.lastName nullable
  isBlocked: boolean  // ✅ Вычисляемое: userBan !== null
}

export interface GetUsersResponse {
  getUsers: {
    users: UserListItem[]
    pagination: {
      page: number
      pageSize: number
      totalCount: number
      pagesCount: number
    }
  }
}