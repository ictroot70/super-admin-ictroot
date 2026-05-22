'use client'

import { useGqlMutation } from '@/shared/api/graphql'
import { LoginAdminDocument } from '@/shared/api/graphql/gql/graphql'

import { useAdminSessionStore } from './admin-session.store'

export const useAdminLogin = () => {
  const setSession = useAdminSessionStore(state => state.setSession)

  const [loginAdmin, { loading, error }] = useGqlMutation(LoginAdminDocument)

  const login = async (email: string, password: string) => {
    const { data } = await loginAdmin({
      variables: {
        email,
        password,
      },
    })

    if (data?.loginAdmin.logged) {
      setSession(email, password)

      return true
    }

    return false
  }

  return {
    login,
    loading,
    error,
  }
}
