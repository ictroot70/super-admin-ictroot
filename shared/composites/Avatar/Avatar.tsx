import type { StaticImageData } from 'next/image'

import { clsx } from 'clsx'
import { memo } from 'react'

import { getAvatarImageSizes, IMAGE_LOADING_STRATEGY, SafeImage } from '@/shared'

type Props = {
  className?: string
  image?: null | string | StaticImageData
  alt?: string
  size?: number
  priority?: boolean
}
export const Avatar = memo(function Avatar({
  image,
  alt,
  className,
  size = 40,
  priority = false,
}: Props) {
  const DEFAULT_AVATAR = '/default-avatar.svg'
  const DEFAULT_AVATAR_ALT = 'Avatar'
  const classNames = clsx('rounded-full object-cover shrink-0', className)
  const imageLoadingStrategy = priority ? IMAGE_LOADING_STRATEGY.lcp : IMAGE_LOADING_STRATEGY.low

  return (
    <SafeImage
      {...imageLoadingStrategy}
      src={image || DEFAULT_AVATAR}
      fallbackSrc={DEFAULT_AVATAR}
      width={size}
      height={size}
      sizes={getAvatarImageSizes(size)}
      alt={alt ?? DEFAULT_AVATAR_ALT}
      telemetryLabel={'Avatar'}
      className={classNames}
    />
  )
})
