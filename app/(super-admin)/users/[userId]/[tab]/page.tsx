import type { ComponentType } from 'react'

import { notFound } from 'next/navigation'

import { isUserTab, type UserTab } from '@/features/admin/user-details/model'
import { PaymentsTab, Followers, Following, UploadedPhotos } from '@/features/admin/user-details/ui'
import { parseUserIdParam } from '@/shared/lib/route-params'

const TAB_TO_COMPONENT_MAP: Record<UserTab, ComponentType> = {
  'uploaded-photos': UploadedPhotos,
  payments: PaymentsTab,
  followers: Followers,
  following: Following,
}

type Props = {
  params: Promise<{
    userId: string
    tab: string
  }>
}

export default async function UserDetailsTabPage({ params }: Props) {
  const { userId, tab } = await params

  if (parseUserIdParam(userId) === null) {
    notFound()
  }

  if (!isUserTab(tab)) {
    notFound()
  }

  const SelectedTabComponent = TAB_TO_COMPONENT_MAP[tab]

  return <SelectedTabComponent />
}
