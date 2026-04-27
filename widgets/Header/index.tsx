'use client'
import { Typography } from '@ictroot/ui-kit'
import { ReactElement } from 'react'

import { Header } from '@/shared/ui'
import { LanguageSelect } from '@/widgets/Header/components'

export const AppHeader = (): ReactElement => {
  return (
    <Header className={'fixed top-0 left-0 z-100 py-3'}>
      <div className={'mx-auto flex w-full max-w-305 justify-between gap-8 px-8'}>
        <div
          className={'m-0 inline-flex items-baseline leading-none'}
          aria-label={'Ictroot SuperAdmin'}
        >
          <Typography variant={'large'}>Ictroot</Typography>
          <Typography variant={'small_text'}>Super</Typography>
          <Typography variant={'semibold_small_text'}>Admin</Typography>
        </div>
        <div className={'flex items-center gap-9'}>
          <LanguageSelect />
        </div>
      </div>
    </Header>
  )
}
