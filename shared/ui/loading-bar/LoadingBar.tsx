export function LoadingBar() {
  return (
    <div
      className={
        'bg-dark-300 pointer-events-none absolute inset-x-0 top-0 z-10 h-1 overflow-hidden'
      }
    >
      <div className={'payments-loading-bar bg-primary-500 h-full w-1/3'} />
    </div>
  )
}
