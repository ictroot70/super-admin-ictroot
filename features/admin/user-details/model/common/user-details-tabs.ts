export const USER_TABS = {
  UPLOADED_PHOTOS: 'uploaded-photos',
  PAYMENTS: 'payments',
  FOLLOWERS: 'followers',
  FOLLOWING: 'following',
} as const

export type UserTab = (typeof USER_TABS)[keyof typeof USER_TABS]

export const DEFAULT_USER_TAB: UserTab = USER_TABS.UPLOADED_PHOTOS

const USER_TAB_SET = new Set<UserTab>(Object.values(USER_TABS))

export const isUserTab = (value: string | null | undefined): value is UserTab =>
  value != null && USER_TAB_SET.has(value as UserTab)

export const USER_TAB_TRIGGERS: { value: UserTab; title: string }[] = [
  { value: USER_TABS.UPLOADED_PHOTOS, title: 'Uploaded photos' },
  { value: USER_TABS.PAYMENTS, title: 'Payments' },
  { value: USER_TABS.FOLLOWERS, title: 'Followers' },
  { value: USER_TABS.FOLLOWING, title: 'Following' },
]
