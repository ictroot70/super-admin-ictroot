# Refactoring Plan for layout.tsx

## Steps to Complete:

- [x] 1. Create constants for routes in a separate file
- [x] 2. Create custom hook `useAuthRedirect` for redirect logic
- [x] 3. Create Loading component with proper styling
- [x] 4. Wrap children in Suspense boundary
- [x] 5. Update layout.tsx with all improvements

## Changes Summary:

### Phase 1: Create Route Constants
- Created `shared/constant/admin-routes.ts` with LOGIN and USERS paths
- Export useAdminSessionStore from index for cleaner imports

### Phase 2: Create Hooks and Components
- Created `app/(super-admin)/_hooks/use-auth-redirect.ts`
- Using existing `Loading` component from `@/shared/composites`

### Phase 3: Update layout.tsx
- Import new constants and components
- Use custom hook for redirect logic
- Replace "Loading..." with Loading component
- Add Suspense boundary

### Files Created:
1. `shared/constant/admin-routes.ts` - Route constants
2. `app/(super-admin)/_hooks/use-auth-redirect.ts` - Custom hook

### Files Updated:
1. `app/(super-admin)/layout.tsx` - Main refactoring
2. `app/(super-admin)/users/page.tsx` - Use ADMIN_ROUTES
3. `app/page.tsx` - Use ADMIN_ROUTES
