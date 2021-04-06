type GSC = 'show' | 'params'

interface OptionsGSC {
  name?: string
  role?: string
  user_id?: string
  school?: string
  educationalStage?: string
}

declare global {
  export interface Window {
    gsc?: (data: GSC, options: number | OptionsGSC) => void
  }
}

export default global
