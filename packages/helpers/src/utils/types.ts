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
    profileTheme: string
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

  primary_color: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }
}

export interface InformationsProps {
  (data: SendInfos): void
}
