// # "use client" — ApolloProvider

"use client";

import { ApolloProvider } from "@apollo/client/react";

import { apolloClient } from "./client";

export const ApolloAppProvider = ({ children }: React.PropsWithChildren) => {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
