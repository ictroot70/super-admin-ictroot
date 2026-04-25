import { gql } from "@apollo/client/core";

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
`;

export interface UserListItem {
  id: number;
  userName: string;
  email: string;
  createdAt: string;
  profile: {
    firstName: string | null;
    lastName: string | null;
    __typename?: string;
  } | null;
  userBan: { reason: string; createdAt: string; __typename?: string } | null;
  __typename?: string;
}

export interface GetUsersResponse {
  getUsers: {
    users: UserListItem[];
    pagination: {
      page: number;
      pageSize: number;
      totalCount: number;
      pagesCount: number;
      __typename?: string;
    };
    __typename?: string;
  };
}
