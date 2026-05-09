import { useGqlMutation } from '@/shared/api/graphql'
import {
  BanUserDocument,
  type BanUserMutation,
  type BanUserMutationVariables,
} from '@/shared/api/graphql/gql/graphql'

type BanUserArgs = {
  userId: string
  banReason: string
}

export const useBanUser = () => {
  const [mutate, state] = useGqlMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument)

  const banUser = async ({ userId, banReason }: BanUserArgs) => {
    const result = await mutate({
      variables: {
        userId: Number(userId),
        banReason,
      },
    })

    if (result.error) {
      throw new Error(result.error.message || 'Failed to ban user')
    }

    if (!result.data?.banUser) {
      throw new Error('Ban operation was rejected')
    }

    return result.data.banUser
  }

  return {
    banUser,
    loading: state.loading,
    error: state.error,
  }
}
