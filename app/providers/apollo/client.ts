// // lib/apollo-client.ts
// import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client/core'
// import { setContext } from '@apollo/client/link/context'

// // 🔹 Безопасная Base64-кодировка (универсальная)
// const toBase64 = (str: string): string => {
//   if (typeof window === 'undefined') {
//     return Buffer.from(str, 'utf-8').toString('base64')
//   }
//   return btoa(unescape(encodeURIComponent(str)))
// }

// // 🔹 HTTP-ссылка
// const httpLink = new HttpLink({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://inctagram.work/api/v1/graphql',
//   credentials: 'include', // если авторизация через куки
// })

// // 🔹 Middleware для авторизации
// const authLink = setContext((_, { headers }) => {
//   let authHeaders: Record<string, string> = {}

//   // 🔹 Вариант 1: Bearer Token из localStorage (приоритет)
//   const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

//   if (token) {
//     authHeaders = { authorization: `Bearer ${token}` }
//   }
//   // 🔹 Вариант 2: Basic Auth из .env (фолбэк)
//   else {
//     const username = process.env.NEXT_PUBLIC_GRAPHQL_USERNAME
//     const password = process.env.NEXT_PUBLIC_GRAPHQL_PASSWORD

//     if (username && password) {
//       const credentials = toBase64(`${username}:${password}`)
//       authHeaders = { authorization: `Basic ${credentials}` }
//     }
//   }

//   return {
//     headers: {
//       ...headers,
//       ...authHeaders,
//     },
//   }
// })

// export const apolloClient = new ApolloClient({
//   link: ApolloLink.from([authLink, httpLink]),
//   cache: new InMemoryCache({
//     typePolicies: {
//       Query: { fields: {} },
//       User: { keyFields: ['id'] },
//     },
//   }),
//   ssrMode: typeof window === 'undefined',
//   ssrForceFetchDelay: 100,
//   defaultOptions: {
//     watchQuery: { fetchPolicy: 'cache-and-network', errorPolicy: 'ignore' },
//     query: { fetchPolicy: 'network-only', errorPolicy: 'all' },
//   },
// })

// export type ApolloClientType = typeof apolloClient


// # ApolloClient + split link (HTTP + graphql-ws)
// # Заполняет Dev-1 в рамках A1

"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

import { useAdminSessionStore } from "@/features/admin/auth/model/admin-session.store";
import { buildBasicHeader } from "@/shared/api/graphql/auth";

const httpLink = new HttpLink({
  uri: "https://inctagram.work/api/v1/graphql",
});

const authLink = new SetContextLink((prevContext, operation) => {
  if (operation.operationName === "loginAdmin") {
    return prevContext;
  }

  const { email, password } = useAdminSessionStore.getState();

  if (!email || !password) {
    return prevContext;
  }

  return {
    headers: {
      ...prevContext.headers,
      Authorization: buildBasicHeader(email, password),
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://inctagram.work/api/v1/graphql",
  }),
);

const httpWithAuthLink = ApolloLink.from([authLink, httpLink]);

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpWithAuthLink,
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
