/**
 * Admin panel route constants
 */
export const ADMIN_ROUTES = {
  LOGIN: "/login",
  USERS: "/users",
} as const;

export type AdminRoute = (typeof ADMIN_ROUTES)[keyof typeof ADMIN_ROUTES];
