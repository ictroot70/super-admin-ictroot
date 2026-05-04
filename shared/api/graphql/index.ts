export { gql } from '@apollo/client'

// Единый entrypoint GraphQL инфраструктуры.
// Dev-1 заполняет в рамках PR A1:
// — путь к Apollo client
// — путь к auth helper
// — примеры импорта для A2/A3/A4/A5/A6

export * from './auth'
export * from './client'
export * from './operations'
export { buildBasicHeader } from './auth'
export { LOGIN_ADMIN_MUTATION } from './operations/mutations/login-admin'
export { POST_ADDED_SUBSCRIPTION } from './operations/subscriptions/post-added'
