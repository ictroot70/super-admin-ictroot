import { useGqlMutation } from '@/shared/api/graphql'
import {
  UnbanUserDocument,
  type UnbanUserMutation,
  type UnbanUserMutationVariables,
} from '@/shared/api/graphql/gql/graphql'

type UnbanUserArgs = {
  userId: string
}

export const useUnbanUser = () => {
  const [mutate, state] = useGqlMutation<UnbanUserMutation, UnbanUserMutationVariables>(
    UnbanUserDocument
  )

  const unbanUser = async ({ userId }: UnbanUserArgs) => {
    const result = await mutate({
      variables: {
        userId: Number(userId),
      },
    })

    if (result.error) {
      throw new Error(result.error.message || 'Failed to unban user')
    }

    if (!result.data?.unbanUser) {
      throw new Error('Unban operation was rejected')
    }

    return result.data.unbanUser
  }

  return {
    unbanUser,
    loading: state.loading,
    error: state.error,
  }
}
