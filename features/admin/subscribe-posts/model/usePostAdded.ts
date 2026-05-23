'use client'

import { useCallback } from 'react'

import { type PostQueryItem } from '@/entities/admin/post'
import { POST_ADDED_SUBSCRIPTION, useGqlSubscription } from '@/shared/api/graphql'

type PostAddedSubscriptionData = {
  postAdded: PostQueryItem
}

type UsePostAddedOptions = {
  onPostAdded?: (post: PostQueryItem) => void
}

export const usePostAdded = ({ onPostAdded }: UsePostAddedOptions = {}) => {
  const handleData = useCallback(
    ({ data }: { data: { data?: PostAddedSubscriptionData } }) => {
      const post = data.data?.postAdded

      if (!post) {
        return
      }

      onPostAdded?.(post)
    },
    [onPostAdded]
  )

  const { error } = useGqlSubscription<PostAddedSubscriptionData>(POST_ADDED_SUBSCRIPTION, {
    onData: handleData,
  })

  return {
    error,
  }
}
