import { gql } from '@apollo/client'

export const POST_ADDED_SUBSCRIPTION = gql`
  subscription PostAdded {
    postAdded {
      id
      ownerId
      description
      createdAt
      updatedAt
      images {
        id
        url
        width
        height
      }
      postOwner {
        id
        userName
        firstName
        lastName
        avatars {
          url
          width
          height
        }
      }
      userBan {
        reason
        createdAt
      }
    }
  }
`
