export interface SendInfos {
  token: string
  reduced_token: string

  logged_in: {
    school: {
      name: string
      id: string
      class: string
    }
    profile: string
  }

  user_info: {
    name: string
    integration_id?: string
    guid?: string
    username: string
    schools: {
      id: string
      name: string
      roles: string[]
    }[]
    email: string
  }
}

export interface InformationsProps {
  cb: (data: SendInfos) => void
}
