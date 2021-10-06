import { pageAction, noticeError } from '@psdhub/newrelic'
import { communicationURLs, Variant, getInstance } from '@psdhub/api'
interface HadReAttempt {
  attempt?: number
  endpoint?: string
  baseURL?: string
  error?: string
  status?: number
}

function hadReAttempt(data: HadReAttempt): void {
  pageAction('API Re-attempts', data)
}

Object.keys(communicationURLs).forEach(key => {
  const instanceKey = key as Variant

  getInstance(instanceKey).addResponseTransform(transform => {
    try {
      const { status, config, originalError } = transform

      const retry = config?.['axios-retry'] as any

      if (retry?.retryCount === 0) return

      hadReAttempt({
        attempt: retry.retryCount as number,
        status: status,
        baseURL: config?.baseURL,
        endpoint: config?.url,
        error: originalError?.message
      })
    } catch (error) {
      noticeError(error as Error)
    }
  })
})

export default hadReAttempt
