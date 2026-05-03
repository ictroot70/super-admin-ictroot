export function LoadingBar() {
  return (
    <div
      className={
        'pointer-events-none absolute inset-x-0 top-0 z-10 h-1 overflow-hidden bg-(--color-dark-300)'
      }
    >
      <div className={'payments-loading-bar h-full w-1/3 bg-(--color-primary-500)'} />
    </div>
  )
}
