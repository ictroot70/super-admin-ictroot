import { ArrowDownSimple, Bell } from '@ictroot/ui-kit/icons'
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

function SortIcon({ direction }: { direction: 'asc' | 'desc' | null }) {
  const iconClass = 'w-3 h-3 inline-flex items-center ml-1'

  if (direction === 'asc') {
    return <ArrowDownSimple className={`${iconClass} rotate-180`} aria-hidden />
  }

  if (direction === 'desc') {
    return <ArrowDownSimple className={iconClass} aria-hidden />
  }

  return (
    <span className={`${iconClass} opacity-30`}>
      <Bell className={'h-2 w-2'} aria-hidden />
    </span>
  )
}
