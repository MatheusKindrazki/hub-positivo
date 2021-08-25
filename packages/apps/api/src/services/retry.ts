import retry from 'axios-retry'
import { AxiosInstance } from 'axios'

import { orRetry } from './retryValidator'

export const statusCodeCondition = [500, 502, 503, 504]

export const retries = 3

function axiosRetry(instance: AxiosInstance): void {
  retry(instance, {
    retries,
    retryDelay: (retryCount: number) => {
      return retryCount * 1000
    },
    retryCondition: (error: any) => {
      return statusCodeCondition.includes(error.response.status)
    }
  })
}

export { orRetry }

export default axiosRetry
