// # auth guard + sidebar + подключение ApolloProvider
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className={'mx-auto flex min-h-screen w-[972px] flex-col gap-[5px]'}>
      {children}
    </section>
  )
}
