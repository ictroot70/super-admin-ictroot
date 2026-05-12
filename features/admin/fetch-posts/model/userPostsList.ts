'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'

import { PostVM } from '@/entities/admin/post'
import { normalizePost } from '@/entities/admin/post/model/normalizePost'
import { usePostAdded } from '@/features/admin/subscribe-posts/model/use-post-added'
import { useGqlLazyQuery } from '@/shared/api/graphql'
import { GetPostsDocument, type GetPostsQuery } from '@/shared/api/graphql/gql/graphql'

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 300

export type PostsListState = {
  posts: PostVM[]
  error: unknown
  isInitialLoading: boolean
  isTyping: boolean
  isSearching: boolean
  isFirstLoadDone: boolean
  isFetchingMore: boolean
  isSwappingPosts: boolean
  hasMore: boolean
  endCursorPostId: null | number
  loadMore: () => Promise<void>
  inputValue: string
  searchTerm: string
  onSearchChange: (value: string) => void
  updateUserBanState: (userId: string, isBanned: boolean) => void
}

export const usePostsList = (): PostsListState => {
  const [posts, setPosts] = useState<PostVM[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const [endCursorPostId, setEndCursorPostId] = useState<number | null>(null)

  const [isTyping, setIsTyping] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [isInitialLoading, setIsInitialLoading] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [isFirstLoadDone, setIsFirstLoadDone] = useState(false)
  const [isSwappingPosts, startPostsSwapTransition] = useTransition()

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const requestIdRef = useRef(0)
  const lastRequestedCursorRef = useRef<number | null>(null)

  const [fetchPosts, { error }] = useGqlLazyQuery<GetPostsQuery>(GetPostsDocument)

  const mergeAppend = useCallback((items: PostVM[]) => {
    setPosts(prev => {
      const existingIds = new Set(prev.map(p => p.id))
      const newItems = items.filter(p => !existingIds.has(p.id))

      return [...prev, ...newItems]
    })
  }, [])

  const mergePrepend = useCallback((item: PostVM) => {
    setPosts(prev => {
      const alreadyExists = prev.some(post => post.id === item.id)

      if (alreadyExists) {
        return prev
      }

      setTotalCount(count => count + 1)

      return [item, ...prev]
    })
  }, [])

  const handlePostAdded = useCallback(
    (post: Parameters<typeof normalizePost>[0]) => {
      const normalizedPost = normalizePost(post)

      mergePrepend(normalizedPost)
    },
    [mergePrepend]
  )

  usePostAdded({ onPostAdded: handlePostAdded })

  const applyResponse = useCallback(
    (data: GetPostsQuery, mode: 'replace' | 'append') => {
      const items = data.getPosts.items.map(normalizePost)
      const nextTotalCount = data.getPosts.totalCount
      const nextEndCursorPostId = items.length > 0 ? items[items.length - 1].id : null

      if (mode === 'replace') {
        startPostsSwapTransition(() => {
          setPosts(prev => {
            const isSameList =
              prev.length === items.length &&
              prev.every((post, index) => post.id === items[index]?.id)

            return isSameList ? prev : items
          })
          setTotalCount(nextTotalCount)
          setEndCursorPostId(nextEndCursorPostId)
        })
      } else {
        mergeAppend(items)
        setTotalCount(nextTotalCount)
        setEndCursorPostId(nextEndCursorPostId)
      }
    },
    [mergeAppend, startPostsSwapTransition]
  )

  const loadInitial = useCallback(
    async (search: string, options?: { initial?: boolean }) => {
      const requestId = ++requestIdRef.current
      const isInitial = options?.initial ?? false

      setIsSearching(true)
      if (isInitial) {
        setIsInitialLoading(true)
      }

      try {
        const result = await fetchPosts({
          variables: {
            pageSize: PAGE_SIZE,
            searchTerm: search || undefined,
            endCursorPostId: undefined,
            sortBy: 'createdAt',
            sortDirection: 'desc',
          },
        })

        if (requestId !== requestIdRef.current) return

        if (result.data) {
          applyResponse(result.data, 'replace')
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setIsSearching(false)
          if (isInitial) {
            setIsInitialLoading(false)
          }
        }
        if (isInitial) {
          setIsFirstLoadDone(true)
        }
      }
    },
    [fetchPosts, applyResponse]
  )

  const loadMore = useCallback(async () => {
    if (isSearching || isFetchingMore || !endCursorPostId) return

    if (lastRequestedCursorRef.current === endCursorPostId) return
    lastRequestedCursorRef.current = endCursorPostId

    setIsFetchingMore(true)

    try {
      const result = await fetchPosts({
        variables: {
          pageSize: PAGE_SIZE,
          searchTerm: searchTerm || undefined,
          endCursorPostId,
          sortBy: 'createdAt',
          sortDirection: 'desc',
        },
      })

      if (result.data) {
        applyResponse(result.data, 'append')
      }
    } finally {
      setIsFetchingMore(false)
    }
  }, [isSearching, isFetchingMore, endCursorPostId, searchTerm, fetchPosts, applyResponse])

  const onSearchChange = useCallback(
    (value: string) => {
      setInputValue(value)
      setIsTyping(true)

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }

      debounceTimer.current = setTimeout(() => {
        setIsTyping(false)
        setSearchTerm(value)
        lastRequestedCursorRef.current = null

        void loadInitial(value)
      }, SEARCH_DEBOUNCE_MS)
    },
    [loadInitial]
  )

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadInitial('', { initial: true })
  }, []) // eslint-disable-line

  const hasMore = endCursorPostId !== null && posts.length < totalCount

  const updateUserBanState = useCallback((userId: string, isBanned: boolean) => {
    setPosts(prev =>
      prev.map<PostVM>(post => {
        if (String(post.postOwner.id) !== userId) {
          return post
        }

        return {
          ...post,
          userBan: isBanned ? { createdAt: '', reason: '' } : null,
        }
      })
    )
  }, [])

  return {
    posts,
    error,

    isInitialLoading,
    isTyping,
    isSearching,
    isFirstLoadDone,
    isFetchingMore,
    isSwappingPosts,

    updateUserBanState,

    hasMore,
    endCursorPostId,
    loadMore,

    inputValue,
    searchTerm,
    onSearchChange,
  }
}
