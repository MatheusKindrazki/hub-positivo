import { PostSolutionData, PutSolutionData } from '../solutions/types'
import { SchoolPermissions, ProfilePermissions } from '../permissions/types'

export interface AccessControlPostData {
  solution: PostSolutionData
  schoolPermissions: SchoolPermissions
  profilePermissions: ProfilePermissions
}

export interface AccessControlPutData {
  solution: PutSolutionData
  schoolPermissions: SchoolPermissions
  profilePermissions: ProfilePermissions
}
