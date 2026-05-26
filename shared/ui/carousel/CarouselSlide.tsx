import { IMAGE_LOADING_STRATEGY } from '@/shared/constant'
import { SafeImage } from '@/shared/ui'

import s from './Carousel.module.scss'

type CarouselSlideProps = {
  fallbackSrc: string
  filtersState?: Record<number, string>
  imageSizes: string
  index: number
  priorityFirstImage: boolean
  slide: string
}

const getFilterClassName = (filtersState: CarouselSlideProps['filtersState'], index: number) => {
  const filter = filtersState?.[index]

  return filter ? s[filter.toLowerCase()] : ''
}

const getImageLoadingStrategy = (priorityFirstImage: boolean, index: number) =>
  priorityFirstImage && index === 0 ? IMAGE_LOADING_STRATEGY.lcp : IMAGE_LOADING_STRATEGY.default

export const CarouselSlide = ({
  fallbackSrc,
  filtersState,
  imageSizes,
  index,
  priorityFirstImage,
  slide,
}: CarouselSlideProps) => (
  <div className={s.carousel__slide}>
    <div className={s.carousel__image}>
      <SafeImage
        {...getImageLoadingStrategy(priorityFirstImage, index)}
        src={slide}
        fallbackSrc={fallbackSrc}
        alt={`Image ${index + 1}`}
        fill
        sizes={imageSizes}
        className={getFilterClassName(filtersState, index)}
      />
    </div>
  </div>
)
