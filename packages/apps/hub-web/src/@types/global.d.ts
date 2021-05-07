declare global {
  export interface Window {
    __HUB_USER_INFO__: {
      id: string
      role: string
      name: string
      school: string
      educational_stage: string
    }
    pageviewCount: number
  }
}

export default global
