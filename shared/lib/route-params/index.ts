export const parseUserIdParam = (value: string): number | null => {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const userId = Number(value);

  if (!Number.isSafeInteger(userId) || userId < 1) {
    return null;
  }

  return userId;
};
