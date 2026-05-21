'use client'

import { Carousel, Modal } from '@/shared/ui'

type Props = {
  open: boolean
  onClose: () => void
  slides: string[]
  initialSlide: number
}

export function PhotoCarousel({ open, onClose, slides, initialSlide }: Props) {
  if (!slides.length) {
    return null
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={'border-yellow h-150 w-150 bg-black/80'}
      closeBtnOutside
    >
      <Carousel slides={slides} options={{ startIndex: initialSlide }} showDots={false} />
    </Modal>
  )
}
