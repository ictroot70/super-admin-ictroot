import { ReactElement } from 'react'

import { Button, CheckboxRadix, Modal, Typography, Variant } from '@/shared/ui'

import styles from './ActionConfirmModal.module.scss'

type ModalButtonProps = {
  label: string
  onClick: () => void
  variant?: Variant
  fullWidth?: boolean
}

interface ActionConfirmModalProps {
  open: boolean
  onClose: () => void
  title: string
  message: string
  highlightedText?: string
  confirmButton: ModalButtonProps
  cancelButton?: ModalButtonProps
  checkbox?: boolean
  question?: boolean

  width?: string
  height?: string
}

export const ActionConfirmModal = ({
  open,
  onClose,
  title,
  message,
  highlightedText,
  confirmButton,
  cancelButton,
  checkbox,
  question,
  width = '438px',
  height = '240px',
}: ActionConfirmModalProps): ReactElement => {
  let content = null

  if (highlightedText) {
    content = question ? (
      <span className={styles.userEmail}> “{highlightedText}”?</span>
    ) : (
      <> {highlightedText} </>
    )
  }

  return (
<<<<<<< HEAD
    <Modal open={open} onClose={onClose} modalTitle={title} width={width} height={height}>
=======
    <Modal
      open={open}
      onClose={onClose}
      modalTitle={title}
      style={{ width: width, height: height }}
    >
>>>>>>> a335f62af2bdb69c73f13cba647562248247d6ba
      <div>
        <Typography variant={'regular_16'} className={styles.text}>
          {message}
          {content}
        </Typography>
        <div className={checkbox ? styles.checkbox : ''}>
          {checkbox && <CheckboxRadix label={'I agree'} onChange={() => {}} />}
          <div className={styles.wrapper}>
            {confirmButton && (
              <Button
                variant={confirmButton.variant ?? 'outlined'}
                onClick={confirmButton.onClick}
                fullWidth={confirmButton.fullWidth}
              >
                <Typography variant={'h3'}>{confirmButton.label}</Typography>
              </Button>
            )}
            {cancelButton && (
              <Button
                variant={cancelButton?.variant ?? 'primary'}
                onClick={cancelButton?.onClick}
                fullWidth={cancelButton?.fullWidth}
              >
                <Typography variant={'h3'}>{cancelButton.label}</Typography>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
