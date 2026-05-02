export const APP_ROUTES = {
  ROOT: '/',

  USERS: {
    ROOT: `/users`,
    ID: (id: number) => `/users/${id}`,
    UPLOADED_PHOTOS: (id: number) => `/users/${id}/uploaded-photos`,
    PAYMENTS: (id: number) => `/users/${id}/payments`,
    FOLLOWERS: (id: number) => `/users/${id}/followers`,
    FOLLOWING: (id: number) => `/users/${id}/following`,
  },
}
