'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'
import { notFound, useParams, useRouter, useSelectedLayoutSegment } from 'next/navigation'

import {
  DEFAULT_USER_TAB,
  USER_TAB_TRIGGERS,
  isUserTab,
  useUserInfo,
} from '@/features/admin/user-details/model'
import { UserInfo } from '@/features/admin/user-details/ui/user-info/UserInfo'
import { APP_ROUTES } from '@/shared/constant'
import { parseUserIdParam } from '@/shared/lib/route-params/parseUserIdParam'
import { ArrowBack, Loading, Typography } from '@/shared/ui'
import { Tabs } from '@/shared/ui/tabs'

type Props = {
  children: ReactNode
}

export default function UserDetailsLayout({ children }: Props) {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()
  const activeTab = isUserTab(segment) ? segment : DEFAULT_USER_TAB

  const params = useParams<{ userId: string }>()
  const userId = parseUserIdParam(params.userId)

  if (userId === null) {
    notFound()
  }

  const { profile, loading, error } = useUserInfo({ userId })

  if (!loading && (!profile || error)) {
    notFound()
  }

  return (
    <section className={'relative mx-auto flex min-h-screen flex-col gap-1.25'}>
      <Link href={APP_ROUTES.USERS.ROOT} className={'mb-6 flex items-center gap-3'}>
        <ArrowBack /> <Typography variant={'regular_14'}>{'Back to Users List'}</Typography>
      </Link>

      {profile && <UserInfo profile={profile} />}

      {loading ? (
        <Loading />
      ) : (
        <>
          <Tabs
            value={activeTab}
            triggers={USER_TAB_TRIGGERS}
            onValueChange={next => router.push(`${APP_ROUTES.USERS.ID(userId)}/${next}`)}
            fullWidth
          />

          <div className={'h-full grow pt-6 pb-6'}>{children}</div>
        </>
      )}
    </section>
  )
}
