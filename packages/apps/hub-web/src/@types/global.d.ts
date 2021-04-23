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

    loadMicrofrontend?: () => void
    unLoadMicrofrontend?: () => void

    mixpanel: typeof mixpanel
  }
}

export default global
