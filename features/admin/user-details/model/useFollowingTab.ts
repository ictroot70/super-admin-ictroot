'use client'

import {
  GetFollowingDocument,
  type GetFollowingQuery,
  type GetFollowingQueryVariables,
} from '@/shared/api/graphql/gql/graphql'

import { useUserRelationshipsTab } from './useUserRelationshipsTab'

export const useFollowingTab = () =>
  useUserRelationshipsTab<GetFollowingQuery, GetFollowingQueryVariables>({
    document: GetFollowingDocument,
    selectConnection: data => data.getFollowing,
  })
