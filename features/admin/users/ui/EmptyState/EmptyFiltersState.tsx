'use client'

import React from 'react'

import { Button, Typography } from '@/shared/ui'

import { FilterValue } from '../../model'
import { Controls } from '../Controls/Controls'
import { PageContainer } from '../PageContainer/PageContainer'

interface EmptyFiltersStateProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterStatus: FilterValue
  onFilterChange: (value: FilterValue) => void
  onClearFilters: () => void
  isFetching?: boolean
}

export const EmptyFiltersState = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  onClearFilters,
  isFetching = false,
}: EmptyFiltersStateProps) => {
  return (
    <PageContainer>
      <Controls
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        filterStatus={filterStatus}
        onFilterChange={onFilterChange}
        isFetching={isFetching}
      />
      <div className={'grid place-items-center gap-4 py-12 text-center'}>
        <Typography variant={'h2'} className={'text-light-100'}>
          No users found
        </Typography>
        <Typography variant={'h3'} className={'text-dark-100'}>
          Try your search or filter criteria
        </Typography>
        <Button variant={'primary'} onClick={onClearFilters}>
          Clear filters
        </Button>
      </div>
    </PageContainer>
  )
}
