'use client'

import { ToastContentProps } from 'react-toastify'

import { Alert, AlertType, variantType, useProgressBar } from '@/shared/ui'

import styles from './ToastAlert.module.scss'

export type AlertToastProps = Partial<ToastContentProps> & {
  type: AlertType
  title?: string
  message: string
  duration?: number
  closeable?: boolean
  typographyVariant?: variantType
  progressBar?: boolean
<<<<<<< HEAD
=======
  onRequestClose?: () => void
>>>>>>> a335f62af2bdb69c73f13cba647562248247d6ba
}

export const ToastAlert = ({
  type,
  title,
  message,
  closeToast,
  duration = 4000,
  closeable = true,
  typographyVariant = 'regular_16',
  progressBar = true,
<<<<<<< HEAD
=======
  onRequestClose,
>>>>>>> a335f62af2bdb69c73f13cba647562248247d6ba
}: AlertToastProps) => {
  const progress = useProgressBar(duration, progressBar)

  return (
    <Alert
      className={styles.root}
      type={type}
      title={title}
      message={message}
      typographyVariant={typographyVariant}
      duration={duration}
      closeable={closeable}
<<<<<<< HEAD
      onClose={closeToast}
=======
      onClose={onRequestClose ?? closeToast}
>>>>>>> a335f62af2bdb69c73f13cba647562248247d6ba
      progressBar={progressBar}
      progress={progress}
    />
  )
}
