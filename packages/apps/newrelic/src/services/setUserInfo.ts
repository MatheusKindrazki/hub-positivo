interface SetUserInfoOptions {
  user_id?: string
  user_name?: string
  user_email?: string
  user_role?: string
  user_school_name?: string
  user_school_class?: string
  user_school_id?: string
  school_list?: string[]
  role_list?: string[]
  user_educational_stage?: string
}

function setUserInfo(options: SetUserInfoOptions): void {
  Object.entries(options).forEach(([key, value]) => {
    window.newrelic?.setCustomAttribute(key, value)
  })
}

export default setUserInfo
