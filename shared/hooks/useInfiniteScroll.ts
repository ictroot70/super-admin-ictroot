'use client'

import { useEffect, useRef } from 'react'

type Props = {
  hasMore: boolean
  disabled?: boolean
  isLoading?: boolean
  rootMargin?: string
  threshold?: number
  onLoadMore: () => Promise<unknown> | void
}

export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = '200px 0px',
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isFetchingRef = useRef(false)

  useEffect(() => {
    const node = ref.current

    if (!node || !hasMore || isLoading) return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]

        if (!entry?.isIntersecting) return
        if (isFetchingRef.current) return

        isFetchingRef.current = true

        Promise.resolve(onLoadMore()).finally(() => {
          isFetchingRef.current = false
        })
      },
      { rootMargin }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [hasMore, isLoading, onLoadMore, rootMargin])

  return { ref }
}
