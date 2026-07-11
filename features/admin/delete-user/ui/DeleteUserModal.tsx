import { showErrorToast } from '@/shared/lib/toast'
import { ConfirmModal, LinearProgress, Typography } from '@/shared/ui'

import { useDeleteUser } from '../model/useDeleteUser'

export type DeleteUserModalProps = {
  open: boolean
  userId: number
  userName: string
  onConfirm: () => void
  onClose: () => void
}

export const DeleteUserModal = ({
  open,
  userId,
  userName,
  onConfirm,
  onClose,
}: DeleteUserModalProps) => {
  const { deleteUser, loading } = useDeleteUser()

  const handleConfirm = async () => {
    try {
      await deleteUser({ userId })
      onConfirm()
    } catch (error) {
      showErrorToast(error instanceof Error ? error.message : 'Request error')
      onClose()
    }
  }

  return (
    <>
      <ConfirmModal
        open={open}
        onClose={onClose}
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
      <div className={'fixed top-0 right-0 left-0 z-100 w-full'}>
        <LinearProgress active={loading} />
      </div>
    </>
  )
}
