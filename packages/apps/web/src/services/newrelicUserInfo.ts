/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { setUserInfo } from '@psdhub/newrelic'

function newrelicUserInfo(data: any): void {
  setUserInfo({
    role_list: data.roles_list,
    school_list: data.schools_list,
    user_educational_stage: data.selected_educational_stage,
    user_email: data.user_mail as string,
    user_id: data.user_id,
    user_name: data.user_name as string,
    user_role: data.selected_role,
    user_school_class: data.selected_class,
    user_school_id: data.selected_school_id,
    user_school_name: data.selected_school_name
  })
}

export default newrelicUserInfo
