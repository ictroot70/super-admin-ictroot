import type { MouseEvent, ReactNode } from 'react'

import { clsx } from 'clsx'
import Link, { type LinkProps } from 'next/link'

import { Typography } from '@/shared/ui'

type SidebarLinkProps = {
  icon?: ReactNode
  activeIcon?: ReactNode
  active?: boolean
  disabled?: boolean
  href: LinkProps['href']
  className?: string
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

export const SidebarLink = ({
  children,
  icon,
  activeIcon,
  active = false,
  disabled = false,
  className,
  href,
  onClick,
}: SidebarLinkProps) => {
  const displayIcon = active && activeIcon ? activeIcon : icon
  const contentColorClass = clsx(
    'text-inherit',
    active && '!text-[var(--color-primary-500)]',
    disabled && '!text-[var(--color-dark-100)]'
  )

  const linkClasses = clsx(
    'group flex pr-[7px] items-center gap-3 border-none bg-transparent  text-inherit no-underline transition-colors duration-200 focus-visible:rounded-[2px] focus-visible:outline-2 focus-visible:outline-(--color-primary-700)',
    disabled
      ? 'cursor-not-allowed text-(--color-dark-100)'
      : 'cursor-pointer hover:text-(--color-primary-100) active:text-(--color-primary-500)',
    active && '!text-[var(--color-primary-500)]',
    className
  )

  const content = (
    <>
      <span className={clsx('flex shrink-0', contentColorClass)}>{displayIcon}</span>
      <Typography
        variant={'bold_14'}
        className={clsx('inline leading-6 tracking-normal', contentColorClass)}
      >
        {children}
      </Typography>
    </>
  )

  if (disabled) {
    return <span className={linkClasses}>{content}</span>
  }

  return (
    <Link
      className={linkClasses}
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      {content}
    </Link>
  )
}

SidebarLink.displayName = 'SidebarLink'
