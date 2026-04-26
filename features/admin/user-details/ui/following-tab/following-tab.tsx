import { RelationshipTabBase } from '../relationship-tab/relationship-tab'
import { following } from './following-mock'

export function FollowingTab() {
  return <RelationshipTabBase items={following} />
}
