'use client'

type Props = {
  active: boolean
}

/**
 * Тонкая полоска индикатора загрузки (2px).
 * active=true  → indeterminate анимация (синяя)
 * active=false → полоска скрыта, место сохраняется (нет layout shift)
 */
export const LinearProgress = ({ active }: Props) => {
  return (
    <div className={'bg-dark-100 h-0.5 w-full overflow-hidden rounded-[1px]'}>
      {active && (
        <div className={'animate-linear-progress bg-primary-500 h-full w-full rounded-[1px]'} />
      )}
    </div>
  )
}
