// # экспортирует хук и модал для posts
// features/admin/ban-user/index.ts

export { BanUserModal } from './ui/BanUserModal'
export { useBanUser } from './model/useBanUser'
export type { BanUserModalProps } from './ui/BanUserModal'
export type { UserActionContract, BanFromPostContract } from './contracts'
