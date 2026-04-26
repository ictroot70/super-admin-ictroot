import { SortDirection } from '../../lib/table-sorting'
import {
  RelationshipSortBy,
  RelationshipSortState,
  RelationshipUserViewModel,
} from './relationship-tab.type'

export const sortRelationshipUsers = (
  items: RelationshipUserViewModel[],
  sort: RelationshipSortState
): RelationshipUserViewModel[] => {
  if (!sort.key || !sort.direction) {
    return items
  }

  const directionMultiplier = sort.direction === SortDirection.ASC ? 1 : -1

  return [...items].sort((a, b) => {
    switch (sort.key) {
      case RelationshipSortBy.PROFILE_LINK:
        return a.profileLink.localeCompare(b.profileLink) * directionMultiplier

      case RelationshipSortBy.SUBSCRIPTION_DATE:
        return (
          (new Date(a.subscriptionDate).getTime() - new Date(b.subscriptionDate).getTime()) *
          directionMultiplier
        )

      default:
        return 0
    }
  })
}
