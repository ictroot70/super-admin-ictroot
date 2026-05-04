import {useState} from 'react'

import {ConfirmModal, Typography, ErrorMessage, Loading} from '@/shared'

import {useBanUser} from '../model/useBanUser'

export type BanUserModalProps = {
  open: boolean
  userId: string
  userName: string
  onConfirm: () => void
}

export const BanUserModal = ({open, userId, userName, onConfirm}: BanUserModalProps) => {
  const {banUser, loading} = useBanUser()
  const [errorMessage, setErrorMessage] = useState('')

  const handleConfirm = async (reason?: string) => {
    if (!reason?.trim()) {
      setErrorMessage('Ban reason is required')

      return
    }

    try {
      setErrorMessage('')
      await banUser({userId, banReason: reason})
      onConfirm()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Request error')
    }
  }

  return (
    <>
      <ConfirmModal
        open={open}
        onClose={onConfirm}
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
      {loading ? <Loading/> : null}
      {errorMessage ? <ErrorMessage message={errorMessage} variant={'danger_small'}/> : null}
    </>
  )
}
