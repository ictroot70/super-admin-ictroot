'use client'

const PRIMARY_ITEMS_COUNT = 5
const SECONDARY_ITEMS_COUNT = 2
const PRIMARY_KEYS = Array.from({ length: PRIMARY_ITEMS_COUNT }, (_, idx) => `primary-${idx + 1}`)
const SECONDARY_KEYS = Array.from(
  { length: SECONDARY_ITEMS_COUNT },
  (_, idx) => `secondary-${idx + 1}`
)

type SkeletonProps = {
  className: string
}

const Skeleton = ({ className }: SkeletonProps) => (
  <div className={`animate-pulse bg-(--color-dark-300) ${className}`} />
)

export const SidebarSkeleton = () => {
  return (
    <aside
      className={
        'fixed top-[60px] left-[max(var(--layout-gutter),calc((100vw-var(--layout-max-width))/2+var(--layout-gutter)))] h-[calc(100vh-60px)] w-[220px] border-r border-r-(--color-dark-300) bg-(--color-dark-700) pr-[6px] text-(--color-light-100)'
      }
      aria-hidden
    >
      <div className={'flex h-full flex-col gap-15 pt-18 pb-9'}>
        <div className={'flex flex-col gap-6 first:pt-3.75 last:mb-0 last:pb-3.75'}>
          {PRIMARY_KEYS.map(key => (
            <div key={key} className={'flex items-center gap-3 pr-1.75'}>
              <Skeleton className={'h-6 min-h-6 w-6 min-w-6 rounded-[5%]'} />
              <Skeleton className={'h-6 min-h-6 w-21.5'} />
            </div>
          ))}
        </div>

        <div className={'flex flex-col gap-6 first:pt-[15px] last:mb-0 last:pb-[15px]'}>
          {SECONDARY_KEYS.map(key => (
            <div key={key} className={'flex items-center gap-3 pr-[7px]'}>
              <Skeleton className={'h-6 min-h-6 w-6 min-w-6 rounded-[5%]'} />
              <Skeleton className={'h-6 min-h-6 w-[86px]'} />
            </div>
          ))}
        </div>

        <div className={'mt-auto flex items-center gap-3 pr-[7px]'}>
          <Skeleton className={'h-6 min-h-6 w-6 min-w-6 rounded-[5%]'} />
          <Skeleton className={'h-6 min-h-6 w-[86px]'} />
        </div>
      </div>
    </aside>
  )
}
