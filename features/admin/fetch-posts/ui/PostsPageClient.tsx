'use client'

import { useCallback, useState } from 'react'

import { AdminPost } from '@/entities/admin/post/ui/AdminPost'
import { BanUserModal } from '@/features/admin/ban-user'
import { useInfiniteScroll } from '@/features/admin/fetch-posts/model/useInfiniteScroll'
import { usePostsList } from '@/features/admin/fetch-posts/model/userPostsList'
import { Loading } from '@/shared/composites'
import { Input, Typography } from '@/shared/ui'

type BanTarget = {
  userId: string
  userName: string
}

export const PostsPageClient = () => {
  const {
    posts,
    error,
    hasMore,
    inputValue,
    isSearching,
    isFirstLoadDone,
    isSwappingPosts,
    onSearchChange,
    loadMore,
    isInitialLoading,
    isFetchingMore,
  } = usePostsList()

  const [banTarget, setBanTarget] = useState<BanTarget | null>(null)

  const { observerRef: infiniteScrollRef } = useInfiniteScroll({
    hasNextPage: hasMore,
    onLoadMore: loadMore,
    disabled: isInitialLoading || isFetchingMore || isSearching,
  })

  const handleBanOwner = useCallback((userId: string, userName: string) => {
    setBanTarget({ userId, userName })
  }, [])

  const handleBanConfirm = useCallback(() => {
    setBanTarget(null)
  }, [])

  const handleBanCancel = useCallback(() => {
    setBanTarget(null)
  }, [])

  return (
    <div className={'flex flex-col gap-9'}>
      <div className={'bg-background sticky top-0 z-50 pt-9'}>
        <Input
          inputType={'search'}
          placeholder={'Search'}
          value={inputValue}
          onChange={e => onSearchChange(e.target.value)}
          className={'relative z-10'}
        />
        <div className={'h-7 pt-2'}>
          <Typography
            variant={'regular_14'}
            className={isSearching && isFirstLoadDone ? 'text-light-900' : 'text-transparent'}
          >
            Searching...
          </Typography>
        </div>
        <div
          className={
            'from-background pointer-events-none absolute right-0 left-0 h-8 bg-linear-to-b from-10% to-transparent'
          }
        />
      </div>

      {Boolean(error) && (
        <Typography variant={'regular_14'} className={'text-danger-500'}>
          Something went wrong
        </Typography>
      )}

      {!isInitialLoading && !isSearching && posts.length === 0 && !Boolean(error) && (
        <Typography variant={'regular_14'} className={'text-light-900'}>
          No posts found
        </Typography>
      )}

      <div
        className={`grid grid-cols-1 gap-4 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
          isSearching || isSwappingPosts ? 'opacity-60' : 'opacity-100'
        }`}
      >
        {posts.map(post => (
          <AdminPost key={post.id} post={post} onBanOwnerAction={handleBanOwner} />
        ))}
      </div>

      {hasMore && <div ref={infiniteScrollRef} className={'h-4'} />}

      {isInitialLoading && (
        <div className={'flex justify-center py-4'}>
          <Loading />
        </div>
      )}

      {banTarget && (
        <BanUserModal
          open={Boolean(banTarget)}
          userId={banTarget.userId}
          userName={banTarget.userName}
          onConfirm={handleBanConfirm}
          onClose={handleBanCancel}
        />
      )}
    </div>
  )
}
