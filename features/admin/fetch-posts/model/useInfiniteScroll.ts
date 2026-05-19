import { useEffect, useRef } from 'react'

type UseInfiniteScrollOptions = {
  disabled?: boolean
  hasNextPage: boolean
  onLoadMore: () => void
  rootMargin?: string
  threshold?: number
}

export const useInfiniteScroll = ({
  disabled = false,
  hasNextPage,
  onLoadMore,
  rootMargin = '120px',
  threshold = 0.1,
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (disabled) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && hasNextPage) {
          onLoadMore()
        }
      },
      { root: null, rootMargin, threshold }
    )

    const current = observerRef.current

    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
      observer.disconnect()
    }
  }, [disabled, hasNextPage, onLoadMore, rootMargin, threshold])

  return { observerRef }
}
