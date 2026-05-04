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
  'mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}': typeof types.LoginAdminDocument
  'query GetFollowers($userId: Int!, $pageSize: Int!, $pageNumber: Int!, $sortBy: String, $sortDirection: SortDirection) {\n  getFollowers(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      userId\n      userName\n      firstName\n      lastName\n      createdAt\n    }\n  }\n}': typeof types.GetFollowersDocument
  'query GetFollowing($userId: Int!, $pageSize: Int!, $pageNumber: Int!, $sortBy: String, $sortDirection: SortDirection) {\n  getFollowing(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      userId\n      userName\n      firstName\n      lastName\n      createdAt\n    }\n  }\n}': typeof types.GetFollowingDocument
  'query GetPaymentsByUser($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n  getPaymentsByUser(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      dateOfPayment\n      endDate\n      price\n      type\n      paymentType\n    }\n  }\n}': typeof types.GetPaymentsByUserDocument
  'query GetUploadedPhotosByUser($userId: Int!, $endCursorId: Int) {\n  getPostsByUser(userId: $userId, endCursorId: $endCursorId) {\n    pagesCount\n    pageSize\n    totalCount\n    items {\n      id\n      url\n    }\n  }\n}': typeof types.GetUploadedPhotosByUserDocument
  'query GetUser($userId: Int!) {\n  getUser(userId: $userId) {\n    id\n    userName\n    email\n    profile {\n      avatars {\n        url\n      }\n      createdAt\n    }\n  }\n}': typeof types.GetUserDocument
}
const documents: Documents = {
  'mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}':
    types.LoginAdminDocument,
  'query GetFollowers($userId: Int!, $pageSize: Int!, $pageNumber: Int!, $sortBy: String, $sortDirection: SortDirection) {\n  getFollowers(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      userId\n      userName\n      firstName\n      lastName\n      createdAt\n    }\n  }\n}':
    types.GetFollowersDocument,
  'query GetFollowing($userId: Int!, $pageSize: Int!, $pageNumber: Int!, $sortBy: String, $sortDirection: SortDirection) {\n  getFollowing(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      userId\n      userName\n      firstName\n      lastName\n      createdAt\n    }\n  }\n}':
    types.GetFollowingDocument,
  'query GetPaymentsByUser($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n  getPaymentsByUser(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      dateOfPayment\n      endDate\n      price\n      type\n      paymentType\n    }\n  }\n}':
    types.GetPaymentsByUserDocument,
  'query GetUploadedPhotosByUser($userId: Int!, $endCursorId: Int) {\n  getPostsByUser(userId: $userId, endCursorId: $endCursorId) {\n    pagesCount\n    pageSize\n    totalCount\n    items {\n      id\n      url\n    }\n  }\n}':
    types.GetUploadedPhotosByUserDocument,
  'query GetUser($userId: Int!) {\n  getUser(userId: $userId) {\n    id\n    userName\n    email\n    profile {\n      avatars {\n        url\n      }\n      createdAt\n    }\n  }\n}':
    types.GetUserDocument,
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
  source: 'mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}'
): (typeof documents)['mutation LoginAdmin($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetFollowers($userId: Int!, $pageSize: Int!, $pageNumber: Int!, $sortBy: String, $sortDirection: SortDirection) {\n  getFollowers(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      userId\n      userName\n      firstName\n      lastName\n      createdAt\n    }\n  }\n}'
): (typeof documents)['query GetFollowers($userId: Int!, $pageSize: Int!, $pageNumber: Int!, $sortBy: String, $sortDirection: SortDirection) {\n  getFollowers(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      userId\n      userName\n      firstName\n      lastName\n      createdAt\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetFollowing($userId: Int!, $pageSize: Int!, $pageNumber: Int!, $sortBy: String, $sortDirection: SortDirection) {\n  getFollowing(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      userId\n      userName\n      firstName\n      lastName\n      createdAt\n    }\n  }\n}'
): (typeof documents)['query GetFollowing($userId: Int!, $pageSize: Int!, $pageNumber: Int!, $sortBy: String, $sortDirection: SortDirection) {\n  getFollowing(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      userId\n      userName\n      firstName\n      lastName\n      createdAt\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetPaymentsByUser($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n  getPaymentsByUser(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      dateOfPayment\n      endDate\n      price\n      type\n      paymentType\n    }\n  }\n}'
): (typeof documents)['query GetPaymentsByUser($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {\n  getPaymentsByUser(\n    userId: $userId\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    sortBy: $sortBy\n    sortDirection: $sortDirection\n  ) {\n    pagesCount\n    page\n    pageSize\n    totalCount\n    items {\n      id\n      dateOfPayment\n      endDate\n      price\n      type\n      paymentType\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetUploadedPhotosByUser($userId: Int!, $endCursorId: Int) {\n  getPostsByUser(userId: $userId, endCursorId: $endCursorId) {\n    pagesCount\n    pageSize\n    totalCount\n    items {\n      id\n      url\n    }\n  }\n}'
): (typeof documents)['query GetUploadedPhotosByUser($userId: Int!, $endCursorId: Int) {\n  getPostsByUser(userId: $userId, endCursorId: $endCursorId) {\n    pagesCount\n    pageSize\n    totalCount\n    items {\n      id\n      url\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetUser($userId: Int!) {\n  getUser(userId: $userId) {\n    id\n    userName\n    email\n    profile {\n      avatars {\n        url\n      }\n      createdAt\n    }\n  }\n}'
): (typeof documents)['query GetUser($userId: Int!) {\n  getUser(userId: $userId) {\n    id\n    userName\n    email\n    profile {\n      avatars {\n        url\n      }\n      createdAt\n    }\n  }\n}']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
