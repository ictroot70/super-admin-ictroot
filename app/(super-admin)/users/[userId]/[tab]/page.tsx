import type { ComponentType } from 'react'

import { notFound } from 'next/navigation'

import { isUserTab, type UserTab } from '@/features/admin/user-details/model'
import {
  PaymentsTab,
  FollowersTab,
  FollowingTab,
  UploadedPhotos,
} from '@/features/admin/user-details/ui'
import { parseUserIdParam } from '@/shared/lib/route-params'

const TAB_TO_COMPONENT_MAP: Record<UserTab, ComponentType> = {
  'uploaded-photos': UploadedPhotos,
  payments: PaymentsTab,
  followers: FollowersTab,
  following: FollowingTab,
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

  /*
    TODO: Make wrapper for table and maybe for photo 
    <div
      className={
        'relative grid h-[calc(100vh-220px)] min-h-full grid-rows-[minmax(0,1fr)_auto] gap-4 overflow-hidden border-2 border-orange-500'
      }
    >
    </div>
*/

  return <SelectedTabComponent />
}
