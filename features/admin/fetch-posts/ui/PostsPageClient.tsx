'use client'

import { useCallback, useState } from 'react'

import { AdminPost } from '@/entities/admin/post/ui/AdminPost'
import { BanUserModal } from '@/features/admin/ban-user'
import { useInfiniteScroll } from '@/features/admin/fetch-posts/model/useInfiniteScroll'
import { usePostsList } from '@/features/admin/fetch-posts/model/userPostsList'
import { UnbanUserModal } from '@/features/admin/unban-user'
import { Loading } from '@/shared/composites'
import { Input, Typography } from '@/shared/ui'

type ModerationAction = 'ban' | 'unban'

type ModerationTarget = {
  userId: string
  userName: string
  action: ModerationAction
}

export const PostsPageClient = () => {
  const {
    posts,
    error,
    hasMore,
    inputValue,
    isTyping,
    isSearching,
    isFirstLoadDone,
    isSwappingPosts,
    onSearchChange,
    loadMore,
    isInitialLoading,
    isFetchingMore,
    updateUserBanState,
  } = usePostsList()

  const [moderationTarget, setModerationTarget] = useState<ModerationTarget | null>(null)

  const { observerRef: infiniteScrollRef } = useInfiniteScroll({
    hasNextPage: hasMore,
    onLoadMore: loadMore,
    disabled: isInitialLoading || isFetchingMore || isSearching,
  })

  const handleModerationAction = useCallback(
    (userId: string, userName: string, action: ModerationAction) => {
      setModerationTarget({ userId, userName, action })
    },
    []
  )

  const handleModerationConfirm = useCallback(() => {
    if (!moderationTarget) return

    updateUserBanState(moderationTarget.userId, moderationTarget.action === 'ban')

    setModerationTarget(null)
  }, [moderationTarget, updateUserBanState])
  const handleModerationCancel = useCallback(() => {
    setModerationTarget(null)
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
            className={
              (isTyping || isSearching) && isFirstLoadDone ? 'text-light-900' : 'text-transparent'
            }
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
          isTyping || isSearching || isSwappingPosts ? 'opacity-60' : 'opacity-100'
        }`}
      >
        {posts.map((post, index) => (
          <AdminPost
            key={post.id}
            post={post}
            isPriorityPost={index < 4}
            onModerationAction={handleModerationAction}
          />
        ))}
      </div>

      {hasMore && <div ref={infiniteScrollRef} className={'h-4'} />}

      {isInitialLoading && (
        <div className={'flex justify-center py-4'}>
          <Loading />
        </div>
      )}

      {moderationTarget?.action === 'ban' && (
        <BanUserModal
          open
          userId={moderationTarget.userId}
          userName={moderationTarget.userName}
          onConfirm={handleModerationConfirm}
          onClose={handleModerationCancel}
        />
      )}

      {moderationTarget?.action === 'unban' && (
        <UnbanUserModal
          open
          userId={moderationTarget.userId}
          userName={moderationTarget.userName}
          onConfirm={handleModerationConfirm}
          onClose={handleModerationCancel}
        />
      )}
    </div>
  )
}
