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
  'query GetUsers($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $searchTerm: String, $statusFilter: UserBlockStatus) {\n  getUsers(\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n    searchTerm: $searchTerm\n    statusFilter: $statusFilter\n  ) {\n    users {\n      id\n      userName\n      email\n      userBan {\n        reason\n        createdAt\n      }\n    }\n    pagination {\n      totalCount\n      pagesCount\n      page\n      pageSize\n    }\n  }\n}': typeof types.GetUsersDocument
}
const documents: Documents = {
  'mutation BanUser($userId: Int!, $banReason: String!) {\n  banUser(userId: $userId, banReason: $banReason)\n}':
    types.BanUserDocument,
  'mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}':
    types.LoginAdminDocument,
  'mutation RemoveUser($userId: Int!) {\n  removeUser(userId: $userId)\n}':
    types.RemoveUserDocument,
  'mutation UnbanUser($userId: Int!) {\n  unbanUser(userId: $userId)\n}': types.UnbanUserDocument,
  'query GetUsers($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $searchTerm: String, $statusFilter: UserBlockStatus) {\n  getUsers(\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n    searchTerm: $searchTerm\n    statusFilter: $statusFilter\n  ) {\n    users {\n      id\n      userName\n      email\n      userBan {\n        reason\n        createdAt\n      }\n    }\n    pagination {\n      totalCount\n      pagesCount\n      page\n      pageSize\n    }\n  }\n}':
    types.GetUsersDocument,
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
  source: 'query GetUsers($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $searchTerm: String, $statusFilter: UserBlockStatus) {\n  getUsers(\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n    searchTerm: $searchTerm\n    statusFilter: $statusFilter\n  ) {\n    users {\n      id\n      userName\n      email\n      userBan {\n        reason\n        createdAt\n      }\n    }\n    pagination {\n      totalCount\n      pagesCount\n      page\n      pageSize\n    }\n  }\n}'
): (typeof documents)['query GetUsers($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $searchTerm: String, $statusFilter: UserBlockStatus) {\n  getUsers(\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n    searchTerm: $searchTerm\n    statusFilter: $statusFilter\n  ) {\n    users {\n      id\n      userName\n      email\n      userBan {\n        reason\n        createdAt\n      }\n    }\n    pagination {\n      totalCount\n      pagesCount\n      page\n      pageSize\n    }\n  }\n}']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
