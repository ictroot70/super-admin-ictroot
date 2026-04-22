// # auth guard + sidebar + подключение ApolloProvider
import { ReactNode } from "react";

import { ApolloAppProvider } from "@/app/providers/apollo/apollo-provider";

export default function Layout({ children }: { children: ReactNode }) {
  return <ApolloAppProvider>{children}</ApolloAppProvider>;
}
