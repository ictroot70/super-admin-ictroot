'use client'

import type { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams, useRouter, useSelectedLayoutSegment } from 'next/navigation'

import { DEFAULT_USER_TAB, USER_TAB_TRIGGERS, isUserTab } from '@/features/admin/user-details/model'
import { APP_ROUTES } from '@/shared/constant'
import { parseUserIdParam } from '@/shared/lib/route-params'
import { ArrowBack, Typography } from '@/shared/ui'
import { Tabs } from '@/shared/ui/tabs'

type Props = {
  children: ReactNode
}

const DEFAULT_AVATAR = '/default-avatar.svg'
const MOCK_AVATAR = '/user_photo.jpg'

export default function UserDetailsLayout({ children }: Props) {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()
  const activeTab = isUserTab(segment) ? segment : DEFAULT_USER_TAB

  const params = useParams<{ userId: string }>()
  const userId = parseUserIdParam(params.userId)

  if (userId === null) {
    notFound()
  }

  return (
    <section className={'w'}>
      <Link href={APP_ROUTES.USERS.ROOT} className={'mb-6 flex items-center gap-3'}>
        <ArrowBack /> <Typography variant={'regular_14'}>{'Back to Users List'}</Typography>
      </Link>

      <div className={'mb-8'}>
        <div className={'flex items-center gap-6'}>
          <Image
            alt={'Avatar'}
            src={MOCK_AVATAR || DEFAULT_AVATAR}
            width={60}
            height={60}
            className={'h-[60px] w-[60px] shrink-0 rounded-full object-cover'}
          />
          <div>
            <Typography variant={'h1'}>Ivan Yakimenko</Typography>
            <Typography variant={'regular_14'} className={'underline'}>
              Ivan.sr.yakimenko
            </Typography>
          </div>
        </div>
        <div className={'mt-5 flex flex-wrap gap-18'}>
          <div>
            <Typography variant={'regular_14'} className={'text-[var(--color-light-900)]'}>
              {'UserID'}
            </Typography>
            <Typography variant={'regular_16'}>{'21331QErQe21'}</Typography>
          </div>
          <div>
            <Typography variant={'regular_14'} className={'text-[#8D9096]'}>
              {'Profile Creation Date'}
            </Typography>
            <Typography variant={'regular_16'}>{'12.12.2022'}</Typography>
          </div>
        </div>
      </div>

      <Tabs
        value={activeTab}
        triggers={USER_TAB_TRIGGERS}
        onValueChange={next => router.push(`${APP_ROUTES.USERS.ID(userId)}/${next}`)}
        fullWidth
      />

      <div className={'mt-6'}>{children}</div>
    </section>
  )
}
