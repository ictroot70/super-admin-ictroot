'use client'

import { useCallback } from 'react'

import { POST_ADDED_SUBSCRIPTION, useGqlSubscription } from '@/shared/api/graphql'
import { type Post } from '@/shared/api/graphql/gql/graphql'

type PostAddedSubscriptionData = {
  postAdded: Post
}

type UsePostAddedOptions = {
  onPostAdded?: (post: Post) => void
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
