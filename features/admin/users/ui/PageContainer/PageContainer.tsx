'use client'

import React, { memo } from 'react'

interface PageContainerProps {
  children: React.ReactNode
}

export const PageContainer = memo(({ children }: PageContainerProps) => (
  <div className={'flex w-full items-center justify-center'}>
    <div className={'grid w-full max-w-[972px] grid-rows-[auto_1fr_auto]'}>{children}</div>
  </div>
))

PageContainer.displayName = 'PageContainer'
