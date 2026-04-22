export const APP_ROUTES = {
  ROOT: "/",

  USERS: {
    ID: (id: string | number) => `/users/${id}`,
    UPLOADED_PHOTOS: (id: string | number) => `/users/${id}/uploaded-photos`,
    PAYMENTS: (id: string | number) => `/users/${id}/payments`,
    FOLLOWERS: (id: string | number) => `/users/${id}/followers`,
    FOLLOWING: (id: string | number) => `/users/${id}/following`,
  },
};
