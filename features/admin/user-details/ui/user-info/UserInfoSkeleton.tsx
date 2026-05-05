export const UserInfoSkeleton = () => {
  return (
    <div className={'mb-8'}>
      <div className={'flex items-center gap-6'}>
        <div className={'h-15 w-15 rounded-full bg-(--color-dark-100)'} />
        <div className={'flex flex-col gap-2'}>
          <div className={'h-5 w-24 rounded bg-(--color-dark-100)'} />
          <div className={'h-3.5 w-20 rounded bg-(--color-dark-100)'} />
        </div>
      </div>
      <div className={'mt-5 flex flex-wrap gap-10'}>
        {/* Доп строки */}
        <div className={'flex flex-col gap-2'}>
          <div className={'h-3 w-34 rounded bg-(--color-dark-100)'} />
          <div className={'h-5 w-30 rounded bg-(--color-dark-100)'} />
        </div>
        <div className={'flex flex-col gap-2'}>
          <div className={'h-3 w-34 rounded bg-(--color-dark-100)'} />
          <div className={'h-5 w-30 rounded bg-(--color-dark-100)'} />
        </div>
      </div>
    </div>
  )
}
