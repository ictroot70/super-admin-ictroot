import Image from 'next/image'

import { formatDate } from '@/shared/lib/format'
import { Typography } from '@/shared/ui'

import { useUserInfo } from '../model'

const DEFAULT_AVATAR = '/default-avatar.svg'

export function UserInfo() {
  const { profile, loading } = useUserInfo()

  if (loading) {
    return <div>Loading...</div>
  }

  const { id, avatar, name, profileLink, createAt } = profile

  return (
    <div className={'mb-8'}>
      <div className={'flex items-center gap-6'}>
        <Image
          alt={'Avatar'}
          src={avatar || DEFAULT_AVATAR}
          width={60}
          height={60}
          className={'h-15 w-15 shrink-0 rounded-full object-cover'}
        />
        <div>
          <Typography variant={'h1'}>{name}</Typography>
          <Typography variant={'regular_14'} className={'underline'}>
            {profileLink}
          </Typography>
        </div>
      </div>
      <div className={'mt-5 flex flex-wrap gap-18'}>
        <div>
          <Typography variant={'regular_14'} className={'text-(--color-light-900)'}>
            {'UserID'}
          </Typography>
          <Typography variant={'regular_16'}>{id}</Typography>
        </div>
        <div>
          <Typography variant={'regular_14'} className={'text-(--color-light-900)'}>
            {'Profile Creation Date'}
          </Typography>
          <Typography variant={'regular_16'}>{formatDate(createAt)}</Typography>
        </div>
      </div>
    </div>
  )
}
