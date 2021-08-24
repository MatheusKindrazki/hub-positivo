import { create } from 'apisauce'

import { AxiosInstance, axios } from './retry'

const timeout = 2000

const communicationURLs = {
  default: process.env.REACT_APP_API_URL,
  auth: process.env.REACT_APP_API_AUTH_URL,
  eem: process.env.REACT_APP_API_EEM_INFOS,
  product: process.env.REACT_APP_API_AUTH_PRODUCT_URL,
  livro: process.env.REACT_APP_API_ARVORE,
  mhund: process.env.REACT_APP_API_MHUND
}

type StringPropsKeys<T extends { [key: string]: any }> = {
  [P in keyof T]: any
}

export type Variant = keyof StringPropsKeys<typeof communicationURLs>
interface CommunicationService {
  [key: string]: AxiosInstance
}

const communicators: CommunicationService = {}

Object.entries(communicationURLs).forEach(([key, url]) => {
  communicators[key] = axios.create({
    baseURL: url,
    timeout
  })
})

export function getCommunicator(key: Variant): AxiosInstance {
  return communicators[key]
}

export function getInstance(key?: Variant): any {
  const communicator = getCommunicator(key || 'default')

  const apisauceInstance = create({
    baseURL: undefined,
    axiosInstance: communicator
  })

  return apisauceInstance
}
