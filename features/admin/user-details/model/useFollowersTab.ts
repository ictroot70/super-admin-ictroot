'use client'

import {
  GetFollowersDocument,
  type GetFollowersQuery,
  type GetFollowersQueryVariables,
} from '@/shared/api/graphql/gql/graphql'

import { useUserRelationshipsTab } from './useUserRelationshipsTab'

export const useFollowersTab = () =>
  useUserRelationshipsTab<GetFollowersQuery, GetFollowersQueryVariables>({
    document: GetFollowersDocument,
    selectConnection: data => data.getFollowers,
  })
