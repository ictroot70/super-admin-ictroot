import { useState } from 'react'

import { ConfirmModal, Typography, ErrorMessage, LinearProgress } from '@/shared/ui'

import { useUnbanUser } from '../model/useUnbanUser'

export type UnbanUserModalProps = {
  open: boolean
  userId: number
  userName: string
  onConfirm: () => void
  onClose: () => void
}

export const UnbanUserModal = ({
  open,
  userId,
  userName,
  onConfirm,
  onClose,
}: UnbanUserModalProps) => {
  const { unbanUser, loading } = useUnbanUser()
  const [errorMessage, setErrorMessage] = useState('')

  const handleConfirm = async () => {
    try {
      setErrorMessage('')
      await unbanUser({ userId })
      onConfirm()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Request error')
    }
  }

  return (
    <>
      <ConfirmModal
        open={open}
        onClose={onClose}
        onConfirm={handleConfirm}
        title={'Un-ban user'}
        description={
          <Typography variant={'regular_16'}>
            Are you sure want to un-ban{' '}
            <Typography asChild variant={'bold_16'}>
              <span>{userName}</span>
            </Typography>
            ?
          </Typography>
        }
      />
      <div className={'fixed top-0 right-0 left-0 z-100 w-full'}>
        <LinearProgress active={loading} />
      </div>
      {errorMessage ? <ErrorMessage message={errorMessage} variant={'danger_small'} /> : null}
    </>
  )
}
