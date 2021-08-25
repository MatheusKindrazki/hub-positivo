import { statusCodeCondition, retries } from './retry'
import { ApiErrorResponse } from './communicators'

export function orRetry(error: ApiErrorResponse<any>): boolean {
  const { config, status } = error

  const retry = config?.['axios-retry'] as any

  if (retry.retryCount !== retries) return false

  return statusCodeCondition.includes(status as number)
}
