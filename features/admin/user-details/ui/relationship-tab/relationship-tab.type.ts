import { SortState } from '../../lib/table-sorting'

export interface RelationshipUserViewModel {
  userId: string
  profileLink: string
  username: string
  subscriptionDate: string
}

export enum RelationshipSortBy {
  PROFILE_LINK = 'profileLink',
  SUBSCRIPTION_DATE = 'subscriptionDate',
}

export type RelationshipSortState = SortState<RelationshipSortBy>
