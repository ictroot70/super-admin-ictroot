'use client'

import { ChangeEvent, useEffect, useRef } from 'react'

import { Input, Select } from '@/shared/ui'

import { FilterValue, FILTER_ITEMS } from '../../model'

interface ControlsProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterStatus: FilterValue
  onFilterChange: (value: FilterValue) => void
  isFetching?: boolean
}

export const Controls = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  isFetching = false,
}: ControlsProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const previousIsFetching = useRef(false)
  const restoreTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const input = inputRef.current

    if (!input) return

    if (restoreTimeoutRef.current) {
      clearTimeout(restoreTimeoutRef.current)
    }

    if (previousIsFetching.current === true && isFetching === false) {
      restoreTimeoutRef.current = setTimeout(() => {
        if (inputRef.current && document.activeElement !== inputRef.current) {
          inputRef.current.focus()
          const length = inputRef.current.value.length

          inputRef.current.setSelectionRange(length, length)
        }
        restoreTimeoutRef.current = null
      }, 50)
    }

    previousIsFetching.current = isFetching
  }, [isFetching])

  useEffect(() => {
    return () => {
      if (restoreTimeoutRef.current) {
        clearTimeout(restoreTimeoutRef.current)
      }
    }
  }, [])

  const handleFilterChange = (value: string) => {
    onFilterChange(value as FilterValue)
  }

  return (
    <div className={'mb-6 flex w-full items-center justify-between gap-11.5'}>
      <div className={'relative z-10 w-[644px] flex-shrink-0'}>
        <Input
          ref={inputRef}
          inputType={'search'}
          placeholder={'Search by name or email...'}
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          className={'h-[36px] w-full'}
          aria-label={'Search users'}
          reserveErrorSpace={false}
        />
      </div>

      <div className={'w-[234px] flex-shrink-0'}>
        <Select
          items={FILTER_ITEMS}
          value={filterStatus}
          onValueChange={handleFilterChange}
          aria-label={'Filter by status'}
          size={'medium'}
          classNames={{
            trigger:
              'h-[36px] flex items-center px-[12px] py-0 rounded-[2px] bg-dark-500 hover:border-light-900 focus:border-transparent focus:outline-2 focus:outline-primary-500 !w-full',
            content: 'bg-dark-500 border-light-100 rounded-[2px]',
            item: 'h-[36px] flex items-center px-[12px] hover:bg-dark-300 hover:text-primary-500',
          }}
        />
      </div>
    </div>
  )
}
