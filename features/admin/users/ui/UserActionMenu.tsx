'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { BanUserModal } from '@/features/admin/ban-user'
import { DeleteUserModal } from '@/features/admin/delete-user'
import { UnbanUserModal } from '@/features/admin/unban-user'
import {
  DropdownMenu,
  DropdownItem,
  MoreHorizontal,
  Block,
  BlockFull,
  PersonRemoveOutline,
} from '@/shared/ui'

type Props = {
  userId: number
  userName: string
  isBanned: boolean
  isAnotherMenuOpen?: boolean
  onMenuTriggerPointerDown?: () => void
  onActionComplete: () => void
}

export const UserActionMenu = (props: Props) => {
  const {
    userId,
    userName,
    onActionComplete,
    isBanned,
    isAnotherMenuOpen,
    onMenuTriggerPointerDown,
  } = props

  const [isBanOpen, setBanOpen] = useState(false)
  const [isUnbanOpen, setUnbanOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)
  const router = useRouter()

  const handleTriggerPointerDown = () => {
    if (isAnotherMenuOpen) {
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Escape',
          code: 'Escape',
          bubbles: true,
        })
      )
    }

    onMenuTriggerPointerDown?.()
  }

  const banItem: DropdownItem = isBanned
    ? { label: 'Un-ban User', icon: <Block />, onClick: () => setUnbanOpen(true) }
    : { label: 'Ban in the system', icon: <BlockFull />, onClick: () => setBanOpen(true) }

  const items: DropdownItem[] = [
    { label: 'Delete User', icon: <PersonRemoveOutline />, onClick: () => setDeleteOpen(true) },
    banItem,
    {
      label: 'More information',
      icon: <MoreHorizontal />,
      onClick: () => router.push(`/users/${userId}`),
    },
  ]

  return (
    <div
      className={'dropdown-menu relative inline-block w-full'}
      onPointerDownCapture={handleTriggerPointerDown}
    >
      <DropdownMenu items={items} align={'end'} side={'bottom'} />

      <BanUserModal
        open={isBanOpen}
        userId={userId}
        userName={userName}
        onConfirm={() => {
          setBanOpen(false)
          onActionComplete()
        }}
        onClose={() => setBanOpen(false)}
      />

      <UnbanUserModal
        open={isUnbanOpen}
        userId={userId}
        userName={userName}
        onConfirm={() => {
          setUnbanOpen(false)
          onActionComplete()
        }}
        onClose={() => setUnbanOpen(false)}
      />

      <DeleteUserModal
        open={isDeleteOpen}
        userId={userId}
        userName={userName}
        onConfirm={() => {
          setDeleteOpen(false)
          onActionComplete()
        }}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  )
}
