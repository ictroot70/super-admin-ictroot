'use client'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

import { SidebarGroup, SidebarLink } from './components'
import { useLinkGroups, type SidebarLinkItem } from './model/useLinkGroups'

export const Sidebar = () => {
  const pathname = usePathname()
  const linkGroupsData = useLinkGroups()

  const isLinkActive = useCallback(
    (link: SidebarLinkItem) => {
      const stripLocalePrefix = (value: string) => value.replace(/^\/(en|ru)(?=\/|$)/, '') || '/'
      const normalizePath = (value: string) => value.replace(/\/+$/, '') || '/'
      const normalizedPathname = normalizePath(stripLocalePrefix(pathname))
      const normalizedHref = normalizePath(link.href)

      if (normalizedHref === '/') {
        return normalizedPathname === '/'
      }

      return (
        normalizedPathname === normalizedHref ||
        normalizedPathname.startsWith(`${normalizedHref}/`) ||
        normalizedPathname.endsWith(normalizedHref) ||
        normalizedPathname.includes(`${normalizedHref}/`)
      )
    },
    [pathname]
  )

  if (!linkGroupsData) {
    return null
  }

  const { linkGroups } = linkGroupsData

  return (
    <nav
      className={
        'sidebar border-r-dark-300 bg-dark-700 fixed top-15 h-[calc(100vh-60px)] w-40 border-r pr-1.5'
      }
    >
      <div className={'flex h-full flex-col gap-15 pt-18 pb-9'}>
        {linkGroups.map(group => (
          <SidebarGroup key={group.links.map(link => link.href).join('|')}>
            {group.links.map(link => (
              <SidebarLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                activeIcon={link.activeIcon}
                disabled={link.disabled}
                active={isLinkActive(link)}
              >
                {link.label}
              </SidebarLink>
            ))}
          </SidebarGroup>
        ))}
      </div>
      {/*<LogOutButton />*/}
    </nav>
  )
}

export { SidebarSkeleton } from './components/SidebarSkeleton'
