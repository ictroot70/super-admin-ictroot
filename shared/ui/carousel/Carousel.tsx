'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'

import { IMAGE_LOADING_STRATEGY, IMAGE_SIZES } from '@/shared/constant'
import { ArrowBackSimple, ArrowForwardSimple } from '@/shared/ui'

import s from './Carousel.module.scss'

type EmblaOptionsType = Parameters<typeof useEmblaCarousel>[0]

type Props = {
  slides: string[]
  options?: EmblaOptionsType
  filtersState?: Record<number, string>
  onSlideChange?: (index: number) => void
  imageSizes?: string
  priorityFirstImage?: boolean
}

export const Carousel: React.FC<Props> = props => {
  const {
    slides,
    options,
    filtersState,
    onSlideChange,
    imageSizes = IMAGE_SIZES.PUBLIC_POST,
    priorityFirstImage = false,
  } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const sync = () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      const index = emblaApi.selectedScrollSnap()

      onSlideChange?.(index)
      setSelectedIndex(index)
      setPrevBtnEnabled(emblaApi.canScrollPrev())
      setNextBtnEnabled(emblaApi.canScrollNext())
    }

    emblaApi.on('select', sync)
    emblaApi.on('reInit', sync)

    const rafId = requestAnimationFrame(sync)

    return () => {
      cancelAnimationFrame(rafId)
      emblaApi.off('select', sync)
      emblaApi.off('reInit', sync)
    }
  }, [emblaApi, onSlideChange])

  return (
    <div className={s.carousel}>
      <div className={s.carousel__viewport} ref={emblaRef}>
        <div className={s.carousel__container}>
          {slides.map((slide, index) => {
            const filter = filtersState && filtersState[index] ? filtersState[index] : ''
            const imageLoadingStrategy =
              priorityFirstImage && index === 0
                ? IMAGE_LOADING_STRATEGY.lcp
                : IMAGE_LOADING_STRATEGY.default

            return (
              <div className={s.carousel__slide} key={index}>
                <div className={s.carousel__image}>
                  <Image
                    {...imageLoadingStrategy}
                    src={slide}
                    alt={`Image ${index + 1}`}
                    fill
                    sizes={imageSizes}
                    className={filter ? s[filter.toLowerCase()] : ''}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {slides.length > 1 && (
        <div className={s.carousel__nav}>
          <button
            className={s.carousel__button}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            type={'button'}
            aria-label={'Previous slide'}
          >
            <ArrowBackSimple />
          </button>
          <button
            className={s.carousel__button}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            type={'button'}
            aria-label={'Next slide'}
          >
            <ArrowForwardSimple />
          </button>
        </div>
      )}

      {slides.length > 1 && (
        <div className={s.carousel__controls}>
          <div className={s.carousel__dots}>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`${s.carousel__dot} ${index === selectedIndex ? s['carousel__dot--active'] : ''}`}
                type={'button'}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
