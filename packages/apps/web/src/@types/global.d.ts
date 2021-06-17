import mixpanel from 'mixpanel-browser'
declare global {
  export interface Window {
    __HUB_USER_INFO__: {
      id: string
      role: string
      name: string
      school: string
      educational_stage: string
    }

    worky: any

    loadMicrofrontend?: () => void
    unLoadMicrofrontend?: () => void

    mixpanel: typeof mixpanel
    pageviewCount: number
    firstCallMCF: boolean
  }
}

export default global
