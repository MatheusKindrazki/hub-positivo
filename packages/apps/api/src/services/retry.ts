import retry from 'axios-retry'
import axios, { AxiosInstance } from 'axios'

const statusCodeCondition = [500, 502, 503, 504]

retry(axios, {
  retries: 3,
  retryDelay: (retryCount: number) => {
    return retryCount * 1000
  },
  retryCondition: (error: any) => {
    return statusCodeCondition.includes(error.response.status)
  }
})

export type { AxiosInstance }

export { axios }
