'use client'

import { useFollowingTab } from '../../model'
import { UserRelationshipsTab } from '../user-relationships-tab/UserRelationshipsTab'

export function FollowingTab() {
  return <UserRelationshipsTab {...useFollowingTab()} errorMessage={'Failed to load following.'} />
}
