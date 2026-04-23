import { clsx } from 'clsx'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<'div'>

export const SidebarGroup = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={clsx('flex flex-col gap-6 first:pt-[15px] last:mb-0 last:pb-[15px]', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
