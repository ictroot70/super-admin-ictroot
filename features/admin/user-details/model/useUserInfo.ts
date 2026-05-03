'use client'
import { notFound, useParams } from 'next/navigation'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
} from '@/shared/api/graphql/gql/graphql'
import { formatDate } from '@/shared/lib/format'
import { parseUserIdParam } from '@/shared/lib/route-params'

import { DEFAULT_AVATAR } from '../lib/constants'

export const useUserInfo = () => {
  const params = useParams<{ userId: string }>()
  const userId = parseUserIdParam(params.userId)

  if (userId === null) {
    notFound()
  }

  const { data, loading, error } = useGqlQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    {
      variables: { userId },
      skip: !userId,
    }
  )

  const user = data?.getUser

  return {
    loading,
    error,
    profile: user
      ? {
          id: user.id,
          name: user.userName,
          avatar: user.profile.avatars?.[0].url ?? DEFAULT_AVATAR,
          profileLink: user.email,
          createAt: formatDate(user.profile.createdAt),
        }
      : null,
  }
}
