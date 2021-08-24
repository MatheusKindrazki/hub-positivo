import retry from 'axios-retry'
import axios, { AxiosInstance, AxiosStatic } from 'axios'

const statusCodeCondition = [500, 502, 503, 504]

function axiosRetry(): AxiosStatic {
  retry(axios, {
    retries: 3,
    retryDelay: (retryCount: number) => {
      console.log('caiu aqui', retryCount)
      return retryCount * 1000
    },
    retryCondition: (error: any) => {
      return statusCodeCondition.includes(error.response.status)
    }
  })

  return axios
}

export type { AxiosInstance }

export default axiosRetry
