import type { ImageProps } from 'next/image'

type ImageLoadingStrategy = Pick<ImageProps, 'fetchPriority' | 'loading' | 'priority' | 'quality'>

export const IMAGE_SIZES = {
  PUBLIC_POST: '234px',
  POST_CARD: '234px',
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
