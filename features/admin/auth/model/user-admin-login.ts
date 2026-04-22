// # loginAdmin mutation (без Basic auth header)
"use client";

import { useMutation } from "@apollo/client/react";

import { useAdminSessionStore } from "./admin-session.store";
import { LOGIN_ADMIN_MUTATION } from "@/shared/api/graphql/operations/mutations/login-admin";

type LoginAdminResponse = {
  loginAdmin: {
    logged: boolean;
  };
};

type LoginAdminVariables = {
  email: string;
  password: string;
};

export const useAdminLogin = () => {
  const setSession = useAdminSessionStore((state) => state.setSession);

  const [loginAdmin, { loading, error }] = useMutation<
    LoginAdminResponse,
    LoginAdminVariables
  >(LOGIN_ADMIN_MUTATION);

  const login = async (email: string, password: string) => {
    const { data } = await loginAdmin({
      variables: {
        email,
        password,
      },
    });

    if (data?.loginAdmin.logged) {
      setSession(email, password);
      return true;
    }

    return false;
  };

  return {
    login,
    loading,
    error,
  };
};