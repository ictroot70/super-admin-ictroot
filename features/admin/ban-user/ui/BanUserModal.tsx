import { useState } from 'react'

import { ConfirmModal, Typography, ErrorMessage, LinearProgress } from '@/shared/ui'

import { useBanUser } from '../model/useBanUser'

export type BanUserModalProps = {
  open: boolean
  userId: number
  userName: string
  onConfirm: () => void
  onClose: () => void
}

export const BanUserModal = ({ open, userId, userName, onConfirm, onClose }: BanUserModalProps) => {
  const { banUser, loading } = useBanUser()
  const [errorMessage, setErrorMessage] = useState('')

  const handleConfirm = async (reason?: string) => {
    if (!reason?.trim()) {
      setErrorMessage('Ban reason is required')

      return
    }

    try {
      setErrorMessage('')
      await banUser({ userId, banReason: reason })
      onConfirm()
      // onClose()
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
        title={'Ban user'}
        description={
          <Typography variant={'regular_16'}>
            Are you sure you want to ban{' '}
            <Typography asChild variant={'bold_16'}>
              <span>{userName}</span>
            </Typography>
            ?
          </Typography>
        }
        withBanReason
      />
      <div className={'fixed top-0 right-0 left-0 z-100 w-full'}>
        <LinearProgress active={loading} />
      </div>
      {errorMessage ? <ErrorMessage message={errorMessage} variant={'danger_small'} /> : null}
    </>
  )
}
