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
