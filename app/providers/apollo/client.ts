// lib/apollo-client.ts
// 🔹 v4: импорты из core и link-подпутей

import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { HttpLink } from '@apollo/client/link/http'
import { setContext } from '@apollo/client/link/context'
import { ApolloLink } from '@apollo/client/core'

// 🔹 Безопасная Base64-кодировка (универсальная)
const toBase64 = (str: string): string => {
  if (typeof window === 'undefined') {
    // Node.js / SSR
    return Buffer.from(str, 'utf-8').toString('base64')
  }
  // Браузер (с поддержкой юникода)
  return btoa(unescape(encodeURIComponent(str)))
}

// 🔹 HTTP-ссылка
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://inctagram.work/api/v1/graphql',
  credentials: 'include',
})

// 🔹 Middleware для авторизации
const authLink = setContext((_, { headers }) => {
  let authHeaders: Record<string, string> = {}

  // 🔹 Читаем токен (только на клиенте)
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  // 🔹 Приоритет: Bearer > Basic Auth
  if (token) {
    authHeaders = { authorization: `Bearer ${token}` }
  } else {
    const username = process.env.NEXT_PUBLIC_GRAPHQL_USERNAME
    const password = process.env.NEXT_PUBLIC_GRAPHQL_PASSWORD
    if (username && password) {
      const credentials = toBase64(`${username}:${password}`)
      authHeaders = { authorization: `Basic ${credentials}` }
    }
  }

  return {
    headers: {
      ...headers,
      ...authHeaders,
    },
  }
})

// 🔹 Создание клиента
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: { fields: {} },
      // 🔹 Нормализация объектов по ID (если бэкенд возвращает __typename + id)
      User: { keyFields: ['id'] },
      Post: { keyFields: ['id'] },
    },
  }),
  ssrMode: typeof window === 'undefined',
  ssrForceFetchDelay: 100,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
})

// 🔹 Экспорт типа для удобства
export type ApolloClientType = typeof apolloClient