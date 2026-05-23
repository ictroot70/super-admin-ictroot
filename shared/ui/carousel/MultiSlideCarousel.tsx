import type { CarouselProps } from './Carousel'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

import { ArrowBackSimple, ArrowForwardSimple } from '@/shared/ui'

import { CarouselSlide } from './CarouselSlide'

import s from './Carousel.module.scss'

type MultiSlideCarouselProps = Required<
  Pick<
    CarouselProps,
    'slides' | 'imageSizes' | 'priorityFirstImage' | 'showDots' | 'showArrows' | 'fallbackSrc'
  >
> &
  Pick<CarouselProps, 'options' | 'filtersState' | 'onSlideChange'>

export const MultiSlideCarousel = ({
  fallbackSrc,
  filtersState,
  imageSizes,
  onSlideChange,
  options,
  priorityFirstImage,
  showArrows,
  showDots,
  slides,
}: MultiSlideCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

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
          {slides.map((slide, index) => (
            <CarouselSlide
              key={`${slide}-${index}`}
              slide={slide}
              index={index}
              filtersState={filtersState}
              imageSizes={imageSizes}
              priorityFirstImage={priorityFirstImage}
              fallbackSrc={fallbackSrc}
            />
          ))}
        </div>
      </div>

      {showArrows && (
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

      {showDots && (
        <div className={s.carousel__controls}>
          <div className={s.carousel__dots}>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`${s.carousel__dot} ${
                  index === selectedIndex ? s['carousel__dot--active'] : ''
                }`}
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
