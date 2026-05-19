import { type GetPostsQuery, type Post } from '@/shared/api/graphql/gql/graphql'

export const normalizePost = (post: GetPostsQuery['getPosts']['items'][number] | Post) => {
  return {
    id: post.id,
    ownerId: post.ownerId,
    description: post.description,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,

    images: post.images
      ? post.images.map(img => ({
          id: img.id ?? null,
          url: img.url ?? null,
          width: img.width ?? null,
          height: img.height ?? null,
        }))
      : null,

    postOwner: {
      id: post.postOwner.id,
      userName: post.postOwner.userName,
      firstName: post.postOwner.firstName ?? null,
      lastName: post.postOwner.lastName ?? null,

      avatars: post.postOwner.avatars
        ? post.postOwner.avatars.map(a => ({
            url: a.url ?? null,
            width: a.width ?? null,
            height: a.height ?? null,
          }))
        : [],
    },

    userBan: post.userBan
      ? {
          reason: post.userBan.reason,
          createdAt: post.userBan.createdAt,
        }
      : null,
  }
}
