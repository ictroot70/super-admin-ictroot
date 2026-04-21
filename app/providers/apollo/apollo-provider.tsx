// # "use client" — ApolloProvider


'use client'

// 🔹 v4: React-компоненты из отдельного подпутя
import { ApolloProvider } from '@apollo/client/react'
import { apolloClient } from './client'

export function Providers({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}