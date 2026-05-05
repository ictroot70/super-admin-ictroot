'use client'
import { notFound, useParams } from 'next/navigation'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
} from '@/shared/api/graphql/gql/graphql'
import { DEFAULT_AVATAR } from '@/shared/constant'
import { formatDate } from '@/shared/lib/format'
import { parseUserIdParam } from '@/shared/lib/route-params'

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
          avatar: user.profile.avatars?.[0]?.url ?? DEFAULT_AVATAR,
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          createAt: formatDate(user.profile.createdAt),
        }
      : null,
  }
}
