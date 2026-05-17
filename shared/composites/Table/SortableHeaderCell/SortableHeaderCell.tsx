import Image from 'next/image'
import { type AriaAttributes, type ReactNode } from 'react'

import { TableHeaderCell } from '../Table'

import s from './SortableHeaderCell.module.scss'

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
      <button type={'button'} onClick={() => onSort(columnKey)} className={s.button}>
        {title}
        <SortIcon direction={iconDirection} />
      </button>
    </TableHeaderCell>
  )
}

const ICON_MAP: Record<'asc' | 'desc' | 'unsorted', string> = {
  asc: '/asc.svg',
  desc: '/desc.svg',
  unsorted: '/unsorted.svg',
}

function SortIcon({ direction }: { direction: 'asc' | 'desc' | null }) {
  const iconKey: 'asc' | 'desc' | 'unsorted' = direction ?? 'unsorted'
  const src = ICON_MAP[iconKey]

  return (
    <span className={'ml-1.5 inline-flex items-center'}>
      <Image src={src} alt={''} aria-hidden width={8} height={6} />
    </span>
  )
}
