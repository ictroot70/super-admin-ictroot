'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { useAdminSessionStore } from '@/features/admin/auth/model/adminSessionStore'
import { ADMIN_ROUTES } from '@/shared/constant/adminRoutes'
import { Button } from '@/shared/ui/button'
import { LogOut } from '@/shared/ui/svg-components'

import { SidebarGroup, SidebarLink } from './components'
import { useLinkGroups, type SidebarLinkItem } from './model/useLinkGroups'

export const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const linkGroupsData = useLinkGroups()
  const clearSession = useAdminSessionStore(state => state.clearSession)

  const handleLogout = useCallback(() => {
    clearSession()
    router.replace(ADMIN_ROUTES.LOGIN)
  }, [clearSession, router])

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
      <div className={'flex h-full flex-col justify-between pt-18 pb-9'}>
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
        <Button
          className={
            'group mt-auto! flex! h-auto! min-h-0! min-w-0! cursor-pointer! items-center! justify-start! gap-3! border-none! bg-transparent! py-0! pr-[7px]! pl-0! text-sm! leading-6! font-(--font-weight-bold)! text-inherit! no-underline! shadow-none! transition-colors! duration-200! hover:text-(--color-primary-100)! focus-visible:rounded-[2px]! focus-visible:text-inherit! focus-visible:outline-2! focus-visible:outline-(--color-primary-700)! active:text-(--color-primary-500)!'
          }
          as={'button'}
          variant={'text'}
          onClick={handleLogout}
        >
          <LogOut />
          <span>Log Out</span>
        </Button>
      </div>
    </nav>
  )
}

export { SidebarSkeleton } from './components/sidebar-skeleton'
