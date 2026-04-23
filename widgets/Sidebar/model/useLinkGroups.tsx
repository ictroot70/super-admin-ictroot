import { ReactElement } from 'react'

import { Person, ImageOutline, CreditCardOutline, TrendingUp } from '@/shared/ui'

export type SidebarLinkItem = {
  href: string
  icon: ReactElement
  activeIcon: ReactElement
  label: string
  disabled?: boolean
}

export type SidebarLinkGroup = {
  links: SidebarLinkItem[]
}

type PlaceholderIconProps = {
  children: ReactElement
}

const SidebarIcon = ({ children }: PlaceholderIconProps): ReactElement => (
  <span className={'inline-flex h-6 w-6 items-center justify-center'} aria-hidden>
    {children}
  </span>
)

export const useLinkGroups = (): { linkGroups: SidebarLinkGroup[] } => {
  // A1 integration point: replace static links and placeholders with domain routes and real icon components.
  const usersIcon = (
    <SidebarIcon>
      <Person />
    </SidebarIcon>
  )
  const statisticsIcon = (
    <SidebarIcon>
      <TrendingUp />
    </SidebarIcon>
  )
  const paymentsIcon = (
    <SidebarIcon>
      <CreditCardOutline />
    </SidebarIcon>
  )
  const postsIcon = (
    <SidebarIcon>
      <ImageOutline />
    </SidebarIcon>
  )

  const linkGroups: SidebarLinkGroup[] = [
    {
      links: [
        {
          href: '/users',
          icon: usersIcon,
          activeIcon: usersIcon,
          label: 'Users list',
        },
        {
          href: '/statistics',
          icon: statisticsIcon,
          activeIcon: statisticsIcon,
          label: 'Statistics',
        },
        {
          href: '/payments',
          icon: paymentsIcon,
          activeIcon: paymentsIcon,
          label: 'Payments list',
        },
        {
          href: '/posts',
          icon: postsIcon,
          activeIcon: postsIcon,
          label: 'Posts list',
        },
      ],
    },
  ]

  return { linkGroups }
}
