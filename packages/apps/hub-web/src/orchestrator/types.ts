export interface Infos {
  token: string
  reduced_token: string
  product: string
  logged_in: {
    school: {
      name: string
      id: string
      class: string
    }
    profile: string
    integration_id: string | null
  }
  expire_in: number
}

export interface DataScripts {
  manifestUrl: string
}

export interface ReturnScripts {
  scripts: {
    type: string
    url: string
  }[]
  element_id: string
}
