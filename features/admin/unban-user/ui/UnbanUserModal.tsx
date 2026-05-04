import { useState } from 'react'

import { ConfirmModal, Typography, ErrorMessage, Loading } from '@/shared'

import { useUnbanUser } from '../model/useUnbanUser'

export type UnbanUserModalProps = {
  open: boolean
  userId: string
  userName: string
  onConfirm: () => void
}

export const UnbanUserModal = ({
  open,
  userId,
  userName,
  onConfirm,
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
        onClose={onConfirm}
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
      {loading ? <Loading/> : null}
      {errorMessage ? <ErrorMessage message={errorMessage} variant={'danger_small'}/> : null}
    </>
  )
}
