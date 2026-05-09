import { useGqlMutation } from '@/shared/api/graphql'
import {
  RemoveUserDocument,
  type RemoveUserMutation,
  type RemoveUserMutationVariables,
} from '@/shared/api/graphql/gql/graphql'

type DeleteUserArgs = {
  userId: string
}

export const useDeleteUser = () => {
  const [mutate, state] = useGqlMutation<RemoveUserMutation, RemoveUserMutationVariables>(
    RemoveUserDocument
  )

  const deleteUser = async ({ userId }: DeleteUserArgs) => {
    const result = await mutate({
      variables: {
        userId: Number(userId),
      },
    })

    if (result.error) {
      throw new Error(result.error.message || 'Failed to delete user')
    }

    if (!result.data?.removeUser) {
      throw new Error('Delete operation was rejected')
    }

    return result.data.removeUser
  }

  return {
    deleteUser,
    loading: state.loading,
    error: state.error,
  }
}
