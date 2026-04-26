import { RelationshipTabBase } from '../relationship-tab/relationship-tab'
import { followers } from './followers-mock'

export function FollowersTab() {
  return <RelationshipTabBase items={followers} />
}
