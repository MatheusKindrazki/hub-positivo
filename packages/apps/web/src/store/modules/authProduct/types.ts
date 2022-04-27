import { ReturnScripts } from '~/orchestrator'

export interface AuthRequest {
  slug: string
  name: string
  url: string
  tipoRenderizacao?: string
  subpath?: string
}

export interface AuthSuccess {
  productData: string | ReturnScripts | null
  productName: string
  mcf?: boolean
}

export interface AuthReducer {
  loading: boolean
  mcf: boolean
  productData: string | ReturnScripts | null
  productName: string | null
}

export type { ReturnScripts }
