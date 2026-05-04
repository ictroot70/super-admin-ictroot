'use client'
import { ReactNode, useState } from 'react'

import { Select, type SelectItemsProps } from '@/shared'
import { banReasonSchema } from '@/shared/lib'
import { Modal, Button, Input } from '@/shared/ui'

const ANOTHER_REASON_VALUE = 'another_reason'

const BAN_REASON_OPTIONS: SelectItemsProps[] = [
  { value: 'bad_behavior', label: 'Bad behavior' },
  { value: 'advertising', label: 'Advertising placement' },
  { value: ANOTHER_REASON_VALUE, label: 'Another reason' },
]

type ConfirmModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: (selectedReason?: string) => void
  title: string
  description: ReactNode
  withBanReason?: boolean
}

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  withBanReason = false,
}: ConfirmModalProps) => {
  const [selectedReason, setSelectedReason] = useState('')
  const [customReason, setCustomReason] = useState('')
  const [touchedCustomReason, setTouchedCustomReason] = useState(false)

  const validation = banReasonSchema.safeParse({ selectedReason, customReason })
  const customReasonError = touchedCustomReason
    ? validation.error?.issues.find(i => i.path[0] === 'customReason')?.message
    : undefined

  const isConfirmDisabled = withBanReason ? !validation.success : false

  const isAnotherReason = selectedReason === ANOTHER_REASON_VALUE

  const handleConfirm = () => {
    if (!withBanReason) {
      onConfirm(undefined)

      return
    }

    const parsed = banReasonSchema.safeParse({ selectedReason, customReason })

    if (!parsed.success) {
      setTouchedCustomReason(true)

      return
    }

    const finalReason =
      parsed.data.selectedReason === ANOTHER_REASON_VALUE
        ? parsed.data.customReason!.trim()
        : parsed.data.selectedReason

    onConfirm(finalReason)
  }

  const handleClose = () => {
    setSelectedReason('')
    setCustomReason('')
    setTouchedCustomReason(false)
    onClose()
  }

  const handleReasonChange = (value: string) => {
    setSelectedReason(value)
    if (value !== ANOTHER_REASON_VALUE) {
      setCustomReason('')
      setTouchedCustomReason(false)
    }
  }

  return (
    <Modal className={'box-border w-94.5'} open={open} onClose={handleClose} modalTitle={title}>
      <div className={'pt-1.5'}>{description}</div>
      {withBanReason && (
        <div>
          <div className={'mt-4.5'}>
            <Select
              classNames={{
                content: 'z-50 relative min-w-[var(--radix-select-trigger-width)]',
              }}
              items={BAN_REASON_OPTIONS}
              placeholder={'Reason for ban'}
              value={selectedReason}
              onValueChange={handleReasonChange}
              portalContainer={null}
            />
          </div>

          {isAnotherReason && (
            <div className={'mt-4.5'}>
              <Input
                type={'text'}
                placeholder={'Enter reason'}
                value={customReason}
                onChange={e => setCustomReason(e.target.value)}
                onBlur={() => setTouchedCustomReason(true)}
                maxLength={500}
                error={customReasonError}
              />
            </div>
          )}
        </div>
      )}

      <div className={'flex justify-between gap-17.5 pt-12'}>
        <div className={'box-border w-32.5'}>
          <Button fullWidth variant={'primary'} onClick={handleClose}>
            No
          </Button>
        </div>
        <div className={'box-border w-32.5'}>
          <Button
            fullWidth
            variant={'outlined'}
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
