export const mapUserStatusToLabel = (isBlocked: boolean): string =>
  isBlocked ? "Blocked" : "Active";

export const getUserStatusBadgeClass = (isBlocked: boolean): string =>
  isBlocked
    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";