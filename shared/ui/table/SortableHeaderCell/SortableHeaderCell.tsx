import React, { type AriaAttributes, type ReactNode } from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'

import { TableHeaderCell } from '../Table'

type Props<T extends string> = {
  title: ReactNode
  columnKey: T
  activeKey?: T
  direction: 'asc' | 'desc' | null
  onSort: (key: T) => void
  className?: string
}

export function SortableHeaderCell<T extends string>({
  title,
  columnKey,
  activeKey,
  direction,
  onSort,
  className,
}: Props<T>) {
  const isActive = activeKey === columnKey
  const iconDirection = isActive ? direction : null

  let ariaSort: AriaAttributes['aria-sort'] = 'none'

  if (isActive && direction === 'asc') {
    ariaSort = 'ascending'
  }

  if (isActive && direction === 'desc') {
    ariaSort = 'descending'
  }

  return (
    <TableHeaderCell className={className} scope={'col'} aria-sort={ariaSort}>
      <button
        type={'button'}
        onClick={() => onSort(columnKey)}
        className={clsx(
          'inline-flex cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 font-inherit text-inherit',
          'focus-visible:rounded-[2px] focus-visible:outline-2 focus-visible:outline-[var(--color-primary-500)] focus-visible:outline-offset-2'
        )}
      >
        {title}
        <SortIcon direction={iconDirection} />
      </button>
    </TableHeaderCell>
  )
}

function SortIcon({ direction }: { direction: 'asc' | 'desc' | null }) {
  return (
    <span className={'inline-flex items-center'}>
      {direction ? (
        <Image src={`/${direction}.svg`} alt={''} aria-hidden width={8} height={6} />
      ) : (
        <Image src={'/unsorted.svg'} alt={''} aria-hidden width={8} height={12} />
      )}
    </span>
  )
}
