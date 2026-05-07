const MAX_GRAPHQL_INT32 = 2_147_483_647

export const parseUserIdParam = (value: string): number | null => {
  if (!/^\d+$/.test(value)) {
    return null
  }

  const userId = Number(value)

  if (!Number.isSafeInteger(userId) || userId < 1 || userId > MAX_GRAPHQL_INT32) {
    return null
  }

  return userId
}
