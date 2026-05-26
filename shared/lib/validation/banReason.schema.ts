import { z } from 'zod'

export const ANOTHER_REASON_VALUE = 'another_reason' as const

export const banReasonSchema = z
  .object({
    selectedReason: z.string(),
    customReason: z.string().trim().max(500, 'Maximum 500 characters').optional(),
  })
  .superRefine(({ selectedReason, customReason }, ctx) => {
    if (!selectedReason) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['selectedReason'],
        message: 'Reason is required',
      })

      return
    }
    if (selectedReason === ANOTHER_REASON_VALUE && !customReason?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['customReason'],
        message: 'Reason is required',
      })
    }
  })
