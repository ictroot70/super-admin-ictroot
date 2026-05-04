'use client'
import { Typography } from '@ictroot/ui-kit'
import { ReactElement } from 'react'

import { Header } from '@/shared/ui'
import { LanguageSelect } from '@/widgets/Header/components'

export const AppHeader = (): ReactElement => {
  return (
    <Header className={'fixed top-0 left-0 z-100 px-0! py-3'}>
      <div
        className={
          '_container mx-auto my-0 flex w-full max-w-(--layout-max-width) justify-between px-8 py-0'
        }
      >
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
