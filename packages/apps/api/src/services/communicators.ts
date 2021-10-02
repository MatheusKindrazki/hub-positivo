import axios from 'axios'
import {
  create,
  ApisauceInstance,
  ApiResponse,
  ApiErrorResponse
} from 'apisauce'

import apiRetry from './retry'

const timeout = 4000

export const communicationURLs = {
  default: process.env.REACT_APP_API_URL,
  auth: process.env.REACT_APP_API_AUTH_URL,
  eem: process.env.REACT_APP_API_EEM_INFOS,
  token: process.env.REACT_APP_API_AUTH_PRODUCT_URL,
  livro: process.env.REACT_APP_API_ARVORE,
  mhund: process.env.REACT_APP_API_MHUND
}

type StringPropsKeys<T extends { [key: string]: any }> = {
  [P in keyof T]: any
}

export type Variant = keyof StringPropsKeys<typeof communicationURLs>
interface CommunicationService {
  [key: string]: any
}

const communicators: CommunicationService = {}

// cria comunicação utilizando o axios
Object.entries(communicationURLs).forEach(([key, url]) => {
  communicators[key] = axios.create({
    baseURL: url,
    timeout
  })
})

// Converte o comunicador para um apiSauce
Object.entries(communicators).forEach(([key, communicator]) => {
  apiRetry(communicator)

  const apisauceInstance = create({
    baseURL: undefined,
    axiosInstance: communicator
  })

  communicators[key] = apisauceInstance
})

export function getCommunicator(key: Variant): ApisauceInstance {
  return communicators[key]
}

export function getInstance(key?: Variant): ApisauceInstance {
  const communicator = getCommunicator(key || 'default')

  return communicator
}

export * from './retry'

export type { ApisauceInstance, ApiResponse, ApiErrorResponse }
