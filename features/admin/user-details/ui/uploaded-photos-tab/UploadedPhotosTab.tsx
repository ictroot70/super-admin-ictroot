'use client'

import Image from 'next/image'
import { notFound, useParams } from 'next/navigation'
import { useState } from 'react'

import { parseUserIdParam } from '@/shared/lib/route-params'
import { LoadingBar, Typography } from '@/shared/ui'

import { useUploadedPhotos, useInfiniteScroll } from '../../model'
import { PhotoCarousel } from './PhotosCarousel'

export function UploadedPhotosTab() {
  const { userId: userIdParam } = useParams<{ userId: string }>()
  const userId = parseUserIdParam(userIdParam)

  if (!userId) {
    notFound()
  }

  const { photos, error, hasMore, isInitialLoading, isFetchingMore, loadMore } =
    useUploadedPhotos(userId)

  const { ref: sentinelRef } = useInfiniteScroll({
    hasMore,
    isLoading: isFetchingMore,
    onLoadMore: loadMore,
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const slides = photos.map(photo => photo.url)

  if (isInitialLoading) return <div>Loading...</div>
  if (error && !photos.length) return <div>Failed to load uploaded photos.</div>

  if (!photos.length) {
    return (
      <Typography variant={'h2'} className={'text-muted-foreground'}>
        There are no uploaded photos yet.
      </Typography>
    )
  }

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <div className={'grid grid-cols-[repeat(auto-fill,minmax(min(100%,234px),1fr))] gap-3'}>
          {photos.map((photo, index) => {
            return (
              <div
                key={photo.id}
                className={'relative block aspect-[234/228] w-full cursor-pointer overflow-hidden'}
                onClick={() => {
                  setStartIndex(index)
                  setIsModalOpen(true)
                }}
              >
                <Image src={photo.url} alt={`Photo ${index + 1}`} fill className={'object-cover'} />
              </div>
            )
          })}
        </div>

        {isFetchingMore && (
          <div className={'relative'}>
            <LoadingBar />
          </div>
        )}

        {hasMore && <div ref={sentinelRef} className={'h-1 w-full'} />}
      </div>

      <PhotoCarousel
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slides={slides}
        initialSlide={startIndex}
      />
    </>
  )
}
