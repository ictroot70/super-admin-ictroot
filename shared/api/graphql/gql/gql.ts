/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  'mutation BanUser($userId: Int!, $banReason: String!) {\n  banUser(userId: $userId, banReason: $banReason)\n}': typeof types.BanUserDocument
  'mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}': typeof types.LoginAdminDocument
  'mutation RemoveUser($userId: Int!) {\n  removeUser(userId: $userId)\n}': typeof types.RemoveUserDocument
  'mutation UnbanUser($userId: Int!) {\n  unbanUser(userId: $userId)\n}': typeof types.UnbanUserDocument
  'query GetUsers($pageNumber: Int, $pageSize: Int, $searchTerm: String, $sortBy: String, $sortDirection: SortDirection, $statusFilter: UserBlockStatus) {\n  getUsers(\n    pageNumber: $pageNumber\n    pageSize: $pageSize\n    searchTerm: $searchTerm\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n    statusFilter: $statusFilter\n  ) {\n    users {\n      id\n      userName\n      email\n      createdAt\n      profile {\n        firstName\n        lastName\n        __typename\n      }\n      userBan {\n        reason\n        createdAt\n        __typename\n      }\n      __typename\n    }\n    pagination {\n      page\n      pageSize\n      totalCount\n      pagesCount\n      __typename\n    }\n    __typename\n  }\n}': typeof types.GetUsersDocument
  'query GetPosts($endCursorPostId: Int, $searchTerm: String, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {\n  getPosts(\n    endCursorPostId: $endCursorPostId\n    searchTerm: $searchTerm\n    pageSize: $pageSize\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pageSize\n    pagesCount\n    totalCount\n    items {\n      id\n      ownerId\n      description\n      createdAt\n      updatedAt\n      images {\n        id\n        url\n        width\n        height\n      }\n      postOwner {\n        id\n        userName\n        firstName\n        lastName\n        avatars {\n          url\n          width\n          height\n        }\n      }\n      userBan {\n        reason\n        createdAt\n      }\n    }\n  }\n}': typeof types.GetPostsDocument
}
const documents: Documents = {
  'mutation BanUser($userId: Int!, $banReason: String!) {\n  banUser(userId: $userId, banReason: $banReason)\n}':
    types.BanUserDocument,
  'mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}':
    types.LoginAdminDocument,
  'mutation RemoveUser($userId: Int!) {\n  removeUser(userId: $userId)\n}':
    types.RemoveUserDocument,
  'mutation UnbanUser($userId: Int!) {\n  unbanUser(userId: $userId)\n}': types.UnbanUserDocument,
  'query GetUsers($pageNumber: Int, $pageSize: Int, $searchTerm: String, $sortBy: String, $sortDirection: SortDirection, $statusFilter: UserBlockStatus) {\n  getUsers(\n    pageNumber: $pageNumber\n    pageSize: $pageSize\n    searchTerm: $searchTerm\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n    statusFilter: $statusFilter\n  ) {\n    users {\n      id\n      userName\n      email\n      createdAt\n      profile {\n        firstName\n        lastName\n        __typename\n      }\n      userBan {\n        reason\n        createdAt\n        __typename\n      }\n      __typename\n    }\n    pagination {\n      page\n      pageSize\n      totalCount\n      pagesCount\n      __typename\n    }\n    __typename\n  }\n}':
    types.GetUsersDocument,
  'query GetPosts($endCursorPostId: Int, $searchTerm: String, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {\n  getPosts(\n    endCursorPostId: $endCursorPostId\n    searchTerm: $searchTerm\n    pageSize: $pageSize\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pageSize\n    pagesCount\n    totalCount\n    items {\n      id\n      ownerId\n      description\n      createdAt\n      updatedAt\n      images {\n        id\n        url\n        width\n        height\n      }\n      postOwner {\n        id\n        userName\n        firstName\n        lastName\n        avatars {\n          url\n          width\n          height\n        }\n      }\n      userBan {\n        reason\n        createdAt\n      }\n    }\n  }\n}':
    types.GetPostsDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation BanUser($userId: Int!, $banReason: String!) {\n  banUser(userId: $userId, banReason: $banReason)\n}'
): (typeof documents)['mutation BanUser($userId: Int!, $banReason: String!) {\n  banUser(userId: $userId, banReason: $banReason)\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}'
): (typeof documents)['mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation RemoveUser($userId: Int!) {\n  removeUser(userId: $userId)\n}'
): (typeof documents)['mutation RemoveUser($userId: Int!) {\n  removeUser(userId: $userId)\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation UnbanUser($userId: Int!) {\n  unbanUser(userId: $userId)\n}'
): (typeof documents)['mutation UnbanUser($userId: Int!) {\n  unbanUser(userId: $userId)\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetUsers($pageNumber: Int, $pageSize: Int, $searchTerm: String, $sortBy: String, $sortDirection: SortDirection, $statusFilter: UserBlockStatus) {\n  getUsers(\n    pageNumber: $pageNumber\n    pageSize: $pageSize\n    searchTerm: $searchTerm\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n    statusFilter: $statusFilter\n  ) {\n    users {\n      id\n      userName\n      email\n      createdAt\n      profile {\n        firstName\n        lastName\n        __typename\n      }\n      userBan {\n        reason\n        createdAt\n        __typename\n      }\n      __typename\n    }\n    pagination {\n      page\n      pageSize\n      totalCount\n      pagesCount\n      __typename\n    }\n    __typename\n  }\n}'
): (typeof documents)['query GetUsers($pageNumber: Int, $pageSize: Int, $searchTerm: String, $sortBy: String, $sortDirection: SortDirection, $statusFilter: UserBlockStatus) {\n  getUsers(\n    pageNumber: $pageNumber\n    pageSize: $pageSize\n    searchTerm: $searchTerm\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n    statusFilter: $statusFilter\n  ) {\n    users {\n      id\n      userName\n      email\n      createdAt\n      profile {\n        firstName\n        lastName\n        __typename\n      }\n      userBan {\n        reason\n        createdAt\n        __typename\n      }\n      __typename\n    }\n    pagination {\n      page\n      pageSize\n      totalCount\n      pagesCount\n      __typename\n    }\n    __typename\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetPosts($endCursorPostId: Int, $searchTerm: String, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {\n  getPosts(\n    endCursorPostId: $endCursorPostId\n    searchTerm: $searchTerm\n    pageSize: $pageSize\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pageSize\n    pagesCount\n    totalCount\n    items {\n      id\n      ownerId\n      description\n      createdAt\n      updatedAt\n      images {\n        id\n        url\n        width\n        height\n      }\n      postOwner {\n        id\n        userName\n        firstName\n        lastName\n        avatars {\n          url\n          width\n          height\n        }\n      }\n      userBan {\n        reason\n        createdAt\n      }\n    }\n  }\n}'
): (typeof documents)['query GetPosts($endCursorPostId: Int, $searchTerm: String, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {\n  getPosts(\n    endCursorPostId: $endCursorPostId\n    searchTerm: $searchTerm\n    pageSize: $pageSize\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pageSize\n    pagesCount\n    totalCount\n    items {\n      id\n      ownerId\n      description\n      createdAt\n      updatedAt\n      images {\n        id\n        url\n        width\n        height\n      }\n      postOwner {\n        id\n        userName\n        firstName\n        lastName\n        avatars {\n          url\n          width\n          height\n        }\n      }\n      userBan {\n        reason\n        createdAt\n      }\n    }\n  }\n}']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
