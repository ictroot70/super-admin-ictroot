export const formatAmount = (amount: number | null) => {
  if (amount === null) {
    return '—'
  }

  return `${amount}$`
}
