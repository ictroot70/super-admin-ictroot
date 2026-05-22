'use client'

type Props = {
  active: boolean
}

export const LinearProgress = ({ active }: Props) => {
  return (
    <div className={'bg-dark-100 h-0.5 w-full overflow-hidden rounded-[1px]'}>
      {active && (
        <div className={'animate-linear-progress bg-primary-500 h-full w-full rounded-[1px]'} />
      )}
    </div>
  )
}
