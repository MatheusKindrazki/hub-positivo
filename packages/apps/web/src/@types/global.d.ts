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

  type MakeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  export declare namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test'
      readonly PUBLIC_URL: string
      PUBLIC_URL: string

      REACT_APP_HUB_TITLE: string

      REACT_APP_API_URL: string

      REACT_APP_API_AUTH_URL: string

      REACT_APP_API_AUTH_PRODUCT_URL: string

      REACT_APP_API_EEM_INFOS: string

      REACT_APP_SECRET_ENCRYPTED_KEY: string
      REACT_APP_PERSIST_NAME: string

      REACT_APP_API_AUTH_TYPE: string
      REACT_APP_API_AUTH_CLIENT_ID: string
      REACT_APP_API_AUTH_SECRET_ID: string
      REACT_APP_API_AUTH_SCOPE: string

      REACT_APP_GTM_MODULE: string
      REACT_APP_NODE_ENV: string

      REACT_APP_RECAPTCHA_SITE_KEY: string

      REACT_APP_API_NOTIFICATION: string

      REACT_APP_FEATURE_NOTIFICATIONS: string
    }
  }
}

export default global
