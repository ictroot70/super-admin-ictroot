import type { ImageProps } from 'next/image'

type ImageLoadingStrategy = Pick<ImageProps, 'fetchPriority' | 'loading' | 'priority' | 'quality'>

export const IMAGE_SIZES = {
  PUBLIC_POST:
    '(min-width: 1280px) calc(25vw - 12px), (min-width: 1024px) calc(33vw - 12px), (min-width: 640px) calc(50vw - 12px), 100vw',
  POST_CARD:
    '(min-width: 1280px) calc(25vw - 12px), (min-width: 1024px) calc(33vw - 12px), (min-width: 640px) calc(50vw - 12px), 100vw',
  POST_MODAL: '(max-width: 968px) 95vw, 490px',
} as const

export const IMAGE_LOADING_STRATEGY = {
  lcp: { priority: true, fetchPriority: 'high' as const, loading: 'eager' as const, quality: 75 },
  default: {
    priority: false,
    fetchPriority: 'auto' as const,
    loading: 'lazy' as const,
    quality: 60,
  },
  low: { priority: false, fetchPriority: 'low' as const, loading: 'lazy' as const, quality: 50 },
} satisfies Record<'default' | 'lcp' | 'low', ImageLoadingStrategy>

export const getAvatarImageSizes = (size: number): string => `${size}px`
