import retry from 'axios-retry'
import { AxiosInstance } from 'axios'

const statusCodeCondition = [500, 502, 503, 504]

function axiosRetry(instance: AxiosInstance): void {
  retry(instance, {
    retries: 3,
    retryDelay: (retryCount: number) => {
      console.log('caiu aqui', retryCount)
      return retryCount * 1000
    },
    retryCondition: (error: any) => {
      return statusCodeCondition.includes(error.response.status)
    }
  })
}

export default axiosRetry
