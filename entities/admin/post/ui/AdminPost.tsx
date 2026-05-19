'use client'

import Link from 'next/link'
import { memo, useEffect, useRef, useState } from 'react'

import { type PostVM } from '@/entities/admin/post'
import { useTimeAgo } from '@/entities/admin/post/hooks/useTimeAgo'
import { Typography, ScrollAreaRadix } from '@/shared'
import { Avatar } from '@/shared/composites/Avatar'
import { Carousel } from '@/shared/composites/Carousel'
import { SafeImage } from '@/shared/composites/SafeImage'
import { IMAGE_LOADING_STRATEGY, IMAGE_SIZES, APP_ROUTES } from '@/shared/constant'

const DEFAULT_IMAGE = '/default-image.svg'
const MAX_CHAR_COUNT = 67

type Props = {
  post: PostVM
  onBanOwnerAction: (userId: string, userName: string) => void
  isPriorityPost?: boolean
}

const AdminPostComponent = ({ post, onBanOwnerAction, isPriorityPost = false }: Props) => {
  const { postOwner, images, description, createdAt, userBan } = post

  const [isExpanded, setIsExpanded] = useState(false)
  const [hasMoreDescriptionBelow, setHasMoreDescriptionBelow] = useState(false)
  const scrollHostRef = useRef<HTMLDivElement | null>(null)

  const isLongDescription = description.length > MAX_CHAR_COUNT

  const timeAgo = useTimeAgo(createdAt)
  const avatarUrl = postOwner.avatars?.[0]?.url ?? undefined

  const slides = images?.flatMap(img => (img.url ? [img.url] : [])) ?? []
  const safeSlides = slides.length > 0 ? slides : [DEFAULT_IMAGE]

  const imageLoadingStrategy = isPriorityPost
    ? IMAGE_LOADING_STRATEGY.lcp
    : IMAGE_LOADING_STRATEGY.default

  const collapseDescription = () => {
    setIsExpanded(false)
    setHasMoreDescriptionBelow(false)
  }

  const toggleDescription = () => {
    if (isExpanded) {
      setHasMoreDescriptionBelow(false)
    }

    setIsExpanded(prev => !prev)
  }

  useEffect(() => {
    if (!isExpanded) {
      return
    }

    const root = scrollHostRef.current
    const viewport = root?.querySelector(
      '[data-radix-scroll-area-viewport]'
    ) as HTMLDivElement | null

    if (!viewport) return

    const updateTopHideVisibility = () => {
      const scrollBottom = viewport.scrollTop + viewport.clientHeight
      const isAtBottom = scrollBottom >= viewport.scrollHeight - 1

      setHasMoreDescriptionBelow(!isAtBottom)
    }

    const animationFrameId = window.requestAnimationFrame(updateTopHideVisibility)
    const resizeObserver = new ResizeObserver(updateTopHideVisibility)

    viewport.addEventListener('scroll', updateTopHideVisibility, { passive: true })
    resizeObserver.observe(viewport)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      viewport.removeEventListener('scroll', updateTopHideVisibility)
      resizeObserver.disconnect()
    }
  }, [description, isExpanded])

  return (
    <div className={'flex h-97.75 w-58.5 flex-col gap-3 overflow-hidden'}>
      <div
        className={
          '{aspect-square h-max-[240px] h-min-[120px] relative h-60 w-full overflow-hidden'
        }
      >
        {safeSlides.length > 1 ? (
          <Carousel
            slides={safeSlides}
            imageSizes={IMAGE_SIZES.PUBLIC_POST}
            priorityFirstImage={isPriorityPost}
          />
        ) : (
          <SafeImage
            {...imageLoadingStrategy}
            src={safeSlides[0]}
            fallbackSrc={DEFAULT_IMAGE}
            alt={'Post image'}
            fill
            sizes={IMAGE_SIZES.PUBLIC_POST}
            telemetryLabel={'AdminPost'}
            className={'w-full object-cover object-center'}
          />
        )}
      </div>

      <div className={'flex items-center gap-3'}>
        <Avatar image={avatarUrl} size={36} />
        <Link href={APP_ROUTES.PROFILE.ID(postOwner.id)}>
          <Typography variant={'h3'}>{postOwner.userName}</Typography>
        </Link>

        {userBan ? (
          <span className={'bg-danger-500 text-light-100 rounded px-2 py-0.5 text-xs font-medium'}>
            Banned
          </span>
        ) : (
          <button
            type={'button'}
            onClick={() => onBanOwnerAction(String(postOwner.id), postOwner.userName)}
            className={'text-danger-500 hover:bg-dark-500 rounded px-2 py-1 text-xs transition'}
          >
            Ban user
          </button>
        )}
      </div>

      <div className={'{overflow-hidden flex flex-col'}>
        <Typography className={'text-light-900 mb-0.75'} variant={'small_text'}>
          {timeAgo}
        </Typography>
        <div ref={scrollHostRef} className={'flex flex-col'}>
          <ScrollAreaRadix className={'overflow-wrap-anywhere h-full max-h-48 grow overflow-auto'}>
            {isExpanded && hasMoreDescriptionBelow && (
              <div className={'bg-dark-700 sticky top-0 right-0 flex flex-row-reverse pb-1'}>
                <Typography className={'bg-background w-auto'} asChild variant={'regular_link'}>
                  <button type={'button'} onClick={collapseDescription}>
                    Hide
                  </button>
                </Typography>
              </div>
            )}
            <Typography className={'inline'} variant={'regular_14'}>
              {isExpanded || !isLongDescription
                ? description
                : description.slice(0, MAX_CHAR_COUNT) + '...'}
            </Typography>
            {isLongDescription && (
              <Typography
                asChild
                onClick={toggleDescription}
                variant={'regular_link'}
                className={
                  'focus-visible:outline-primary-700 ml-0.75 inline leading-5 focus-visible:outline'
                }
              >
                <button aria-expanded={isExpanded} type={'button'}>
                  {isExpanded ? 'Hide' : 'ShowMore'}
                </button>
              </Typography>
            )}
          </ScrollAreaRadix>
        </div>
      </div>
    </div>
  )
}

export const AdminPost = memo(AdminPostComponent)
