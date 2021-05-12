import { PostSolutionPayload } from '../solutions/types'
import { SchoolPermissions, ProfilePermissions } from '../permissions/types'

export interface AccessControlData {
  solution: PostSolutionPayload
  schoolPermissions: SchoolPermissions
  profilePermissions: ProfilePermissions
}
