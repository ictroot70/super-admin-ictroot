'use client'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
} from '@/shared/api/graphql/gql/graphql'
import { DEFAULT_AVATAR } from '@/shared/constant'
import { formatDate } from '@/shared/lib/format'

type Props = {
  userId: number
}

export const useUserInfo = ({ userId }: Props) => {
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
          createdAt: formatDate(user.profile.createdAt),
        }
      : null,
  }
}
