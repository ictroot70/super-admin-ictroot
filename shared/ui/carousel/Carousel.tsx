'use client'

import useEmblaCarousel from 'embla-carousel-react'
import React from 'react'

import { IMAGE_SIZES } from '@/shared/constant'

import { CarouselSlide } from './CarouselSlide'
import { MultiSlideCarousel } from './MultiSlideCarousel'

import s from './Carousel.module.scss'

type EmblaOptionsType = Parameters<typeof useEmblaCarousel>[0]

export type CarouselProps = {
  slides: string[]
  options?: EmblaOptionsType
  filtersState?: Record<number, string>
  onSlideChange?: (index: number) => void
  imageSizes?: string
  priorityFirstImage?: boolean
  showDots?: boolean
  showArrows?: boolean
  fallbackSrc?: string
}

const DEFAULT_IMAGE = '/default-image.svg'

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  options,
  filtersState,
  onSlideChange,
  imageSizes = IMAGE_SIZES.PUBLIC_POST,
  priorityFirstImage = false,
  showDots = true,
  showArrows = true,
  fallbackSrc = DEFAULT_IMAGE,
}) => {
  if (slides.length === 0) {
    return null
  }

  if (slides.length === 1) {
    return (
      <div className={s.carousel}>
        <div className={s.carousel__viewport}>
          <div className={s.carousel__container}>
            <CarouselSlide
              slide={slides[0]}
              index={0}
              filtersState={filtersState}
              imageSizes={imageSizes}
              priorityFirstImage={priorityFirstImage}
              fallbackSrc={fallbackSrc}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <MultiSlideCarousel
      slides={slides}
      options={options}
      filtersState={filtersState}
      onSlideChange={onSlideChange}
      imageSizes={imageSizes}
      priorityFirstImage={priorityFirstImage}
      showDots={showDots}
      showArrows={showArrows}
      fallbackSrc={fallbackSrc}
    />
  )
}
