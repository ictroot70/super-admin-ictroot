'use client'

import { useFollowersTab } from '../../model'
import { UserRelationshipsTab } from '../user-relationships-tab/UserRelationshipsTab'

export function FollowersTab() {
  return <UserRelationshipsTab {...useFollowersTab()} errorMessage={'Failed to load followers.'} />
}
