import { pageAction } from '@psdhub/newrelic'
import { communicationURLs, Variant, getInstance } from '@psdhub/api'
interface HadReAttempt {
  attempt?: number
  url?: string
  error?: string
  status?: number
}

function hadReAttempt(data: HadReAttempt): void {
  pageAction('API Re-attempts', data)
}

Object.keys(communicationURLs).forEach(key => {
  const instanceKey = key as Variant

  getInstance(instanceKey).addResponseTransform(transform => {
    const { status, config, originalError } = transform

    const retry = config?.['axios-retry'] as any

    if (retry === 0) return

    hadReAttempt({
      attempt: retry as number,
      status: status,
      url: config?.url,
      error: originalError?.message
    })
  })
})

export default hadReAttempt
