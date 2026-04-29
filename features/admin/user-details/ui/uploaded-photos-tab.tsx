'use client'

import Image from 'next/image'
import { useState } from 'react'

import { PhotoCarousel } from './photo-carousel'

const mock_images = [
  {
    id: 6491,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/0ff88576-3365-458f-ba3a-3688005c2eb7_users/65/post/0b073ca1-ce98-4fb7-877c-8a6a21b3fef5-images-1440x1440',
  },
  {
    id: 6361,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/e4a6cf32-8a32-4b6a-b597-f7929003c8b4_users/65/post/99c7608f-e142-4867-b6b1-3d861483b979-images-1440x1440',
  },
  {
    id: 6355,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/b2aa9be8-73e8-49f3-bb2d-f1729b6c27e0_users/65/post/9171d9d4-dc44-4c3c-81c9-413541784aeb-images-1440x1440',
  },
  {
    id: 6353,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/ef7ee0df-1e4a-4392-8e55-6430b30ec65f_users/65/post/d52cf907-628f-4b81-b2aa-686133c5b7de-images-1440x1440',
  },
  {
    id: 6329,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/f767a1a2-6a7e-4ec3-888e-4aacf5139c57_users/65/post/67b04552-16ce-4794-a22d-992cf5f3adfd-images-1440x1440',
  },
  {
    id: 6325,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/d60ebde6-8142-4ea2-9559-5cdbdba46301_users/65/post/9924feef-9d53-473a-a704-e149e5144bd0-images-1440x1440',
  },
  {
    id: 64911,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/0ff88576-3365-458f-ba3a-3688005c2eb7_users/65/post/0b073ca1-ce98-4fb7-877c-8a6a21b3fef5-images-1440x1440',
  },
  {
    id: 63612,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/e4a6cf32-8a32-4b6a-b597-f7929003c8b4_users/65/post/99c7608f-e142-4867-b6b1-3d861483b979-images-1440x1440',
  },
  {
    id: 63553,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/b2aa9be8-73e8-49f3-bb2d-f1729b6c27e0_users/65/post/9171d9d4-dc44-4c3c-81c9-413541784aeb-images-1440x1440',
  },
  {
    id: 63534,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/ef7ee0df-1e4a-4392-8e55-6430b30ec65f_users/65/post/d52cf907-628f-4b81-b2aa-686133c5b7de-images-1440x1440',
  },
  {
    id: 63295,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/f767a1a2-6a7e-4ec3-888e-4aacf5139c57_users/65/post/67b04552-16ce-4794-a22d-992cf5f3adfd-images-1440x1440',
  },
  {
    id: 63256,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/d60ebde6-8142-4ea2-9559-5cdbdba46301_users/65/post/9924feef-9d53-473a-a704-e149e5144bd0-images-1440x1440',
  },
]

export function UploadedPhotos() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const slides = mock_images.map(img => img.url)

  return (
    <>
      <div className={'grid grid-cols-[repeat(auto-fill,minmax(min(100%,234px),1fr))] gap-3'}>
        {mock_images.map((img, index) => {
          return (
            <div
              key={img.id}
              className={'relative block aspect-[234/228] w-full cursor-pointer overflow-hidden'}
              onClick={() => {
                setStartIndex(index)
                setIsModalOpen(true)
              }}
            >
              <Image src={img.url} alt={`Photo ${index + 1}`} fill className={'object-cover'} />
            </div>
          )
        })}
      </div>

      <PhotoCarousel
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slides={slides}
        initialSlide={startIndex}
      />
    </>
  )
}
