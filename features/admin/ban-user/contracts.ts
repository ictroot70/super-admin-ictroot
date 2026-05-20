// features/admin/ban-user/contracts.ts

/**
 * Контракт входящих данных от A2 (UsersList).
 * Dev-2 обязан передавать эти поля в UserActionMenu.
 * Источник: userBan из GraphQL схемы (nullable).
 */
export interface UserActionContract {
  userId: string
  userName: string
  isBanned: boolean // nullable в схеме → fallback false
  onActionComplete: () => void
}

/**
 * Контракт для переиспользования ban flow в A6 (Posts).
 * Dev-4 импортирует BanUserModal и useBanUser из этого модуля.
 * Путь импорта: @/features/admin/ban-user
 * Запрещено: дублировать modal или хук в features/admin/fetch-posts
 */
export interface BanFromPostContract {
  userId: string
  userName: string
  postId: string // дополнительный контекст для posts-контекста
  onConfirm: (reason: string) => void
  onCancel: () => void
}
