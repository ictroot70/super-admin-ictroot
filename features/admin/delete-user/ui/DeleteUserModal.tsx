import { useState } from 'react'

import {ConfirmModal, ErrorMessage, Loading, Typography} from '@/shared'

import { useDeleteUser } from '../model/useDeleteUser'

export type DeleteUserModalProps = {
  open: boolean
  userId: string
  userName: string
  onConfirm: () => void
}

export const DeleteUserModal = ({
  open,
  userId,
  userName,
  onConfirm,
}: DeleteUserModalProps) => {
  const { deleteUser, loading } = useDeleteUser()
  const [errorMessage, setErrorMessage] = useState('')

  const handleConfirm = async () => {
    try {
      setErrorMessage('')
      await deleteUser({ userId })
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
        title={'Delete user'}
        description={
          <Typography variant={'regular_16'}>
            Are you sure you want to delete{' '}
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
