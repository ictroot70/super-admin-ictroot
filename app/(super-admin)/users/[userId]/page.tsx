import { notFound, redirect } from 'next/navigation'

import { APP_ROUTES } from '@/shared/constant'
import { parseUserIdParam } from '@/shared/lib/route-params'

type Props = {
  params: Promise<{ userId: string }>
}

export default async function Page({ params }: Props) {
  const { userId } = await params
  const parsedUserId = parseUserIdParam(userId)

  if (parsedUserId === null) {
    notFound()
  }

  redirect(APP_ROUTES.USERS.UPLOADED_PHOTOS(parsedUserId))
}
