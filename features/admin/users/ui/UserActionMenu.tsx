'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { BanUserModal } from '@/features/admin/ban-user'
import { DeleteUserModal } from '@/features/admin/delete-user'
import { UnbanUserModal } from '@/features/admin/unban-user'
import { DropdownMenu, DropdownItem } from '@/shared/ui'
import { MoreHorizontal, Block, BlockFull, PersonRemoveOutline } from '@/shared/ui/SVGComponents'

interface UserActionMenuProps {
  userId: string
  userName: string
  isBanned: boolean
  onActionComplete: () => void
}

export const UserActionMenu = (props: UserActionMenuProps) => {
  const { userId, userName, onActionComplete, isBanned } = props

  const [isBanOpen, setBanOpen] = useState(false)
  const [isUnbanOpen, setUnbanOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)
  const router = useRouter()

  const banItem: DropdownItem = isBanned
    ? { label: 'Un-ban User', icon: <Block />, onClick: () => setUnbanOpen(true) }
    : { label: 'Ban User', icon: <BlockFull />, onClick: () => setBanOpen(true) }

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
    <div className={'dropdown-menu relative inline-block w-full'}>
      <DropdownMenu
        contentClassName={'w-[178px] h-[121px]'}
        items={items}
        align={'start'}
        side={'bottom'}
        showArrow
      />

      <BanUserModal
        open={isBanOpen}
        userId={userId}
        userName={userName}
        onConfirm={() => {
          setBanOpen(false)
          onActionComplete()
        }}
      />

      <UnbanUserModal
        open={isUnbanOpen}
        userId={userId}
        userName={userName}
        onConfirm={() => {
          setUnbanOpen(false)
          onActionComplete()
        }}
      />

      <DeleteUserModal
        open={isDeleteOpen}
        userId={userId}
        userName={userName}
        onConfirm={() => {
          setDeleteOpen(false)
          onActionComplete()
        }}
      />
    </div>
  )
}
