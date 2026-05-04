import { NetworkStatus } from '@apollo/client'
import { useMemo, useCallback } from 'react'

import { useGqlQuery } from '@/shared/api/graphql'
import {
  GetUploadedPhotosByUserDocument,
  type GetUploadedPhotosByUserQuery,
  type GetUploadedPhotosByUserQueryVariables,
} from '@/shared/api/graphql/gql/graphql'

type UploadedPhoto = {
  id: number
  url: string
}

const getLastCursorId = (
  items: GetUploadedPhotosByUserQuery['getPostsByUser']['items'] | null | undefined
) => {
  let lastId: number | null = null

  for (const item of items ?? []) {
    if (item?.id != null) {
      lastId = item.id
    }
  }

  return lastId
}

const mergeUploadedPhotoPages = (
  previous: GetUploadedPhotosByUserQuery,
  next: GetUploadedPhotosByUserQuery
): GetUploadedPhotosByUserQuery => {
  const items = [...(previous.getPostsByUser.items ?? [])]
  const existingIds = new Set(items.map(i => i?.id))

  for (const item of next.getPostsByUser.items ?? []) {
    if (item?.id != null && !existingIds.has(item.id)) {
      items.push(item)
    }
  }

  return {
    getPostsByUser: {
      ...next.getPostsByUser,
      items,
    },
  }
}

export const useUploadedPhotos = (userId: number | null) => {
  const variables = useMemo<GetUploadedPhotosByUserQueryVariables>(
    () => ({
      userId: userId!,
      endCursorId: null,
    }),
    [userId]
  )

  const { data, previousData, loading, error, networkStatus, fetchMore } = useGqlQuery<
    GetUploadedPhotosByUserQuery,
    GetUploadedPhotosByUserQueryVariables
  >(GetUploadedPhotosByUserDocument, {
    variables,
    skip: !userId,
    notifyOnNetworkStatusChange: true,
  })

  const uploadedPhotos = data?.getPostsByUser ?? previousData?.getPostsByUser
  const rawItems = uploadedPhotos?.items ?? []

  const photos: UploadedPhoto[] = rawItems.filter(
    (item): item is UploadedPhoto => item?.id != null && item.url != null
  )

  const totalCount = uploadedPhotos?.totalCount ?? 0
  const hasMore = rawItems.length < totalCount
  const endCursorId = getLastCursorId(rawItems)

  const isInitialLoading = loading && !data && !previousData
  const isFetchingMore = networkStatus === NetworkStatus.fetchMore

  const loadMore = useCallback(() => {
    if (!hasMore || isFetchingMore || endCursorId == null || !userId) {
      return Promise.resolve()
    }

    return fetchMore({
      variables: {
        userId,
        endCursorId,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        return mergeUploadedPhotoPages(prev, fetchMoreResult)
      },
    })
  }, [endCursorId, fetchMore, hasMore, isFetchingMore, userId])

  return {
    photos,
    error,
    hasMore,
    isInitialLoading,
    isFetchingMore,
    loadMore,
  }
}
