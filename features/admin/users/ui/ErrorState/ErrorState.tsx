'use client'

import { memo } from 'react'

import { Button, Typography } from '@/shared/ui'

type ErrorStateProps = {
  onRetry?: () => void
}

export const ErrorState = memo(({ onRetry }: ErrorStateProps) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className={'flex min-h-screen items-center justify-center'}>
      <div className={'space-y-4 text-center'}>
        <Typography variant={'h1'} className={'text-light-100'}>
          Failed to load users
        </Typography>
        <Button variant={'secondary'} onClick={handleRetry}>
          Retry
        </Button>
      </div>
    </div>
  )
})

ErrorState.displayName = 'ErrorState'
