import { pageAction } from '@psdhub/newrelic'

interface HadReAttempt {
  attempt: number
  url: string
  error?: string
  status: number
}

function hadReAttempt(data: HadReAttempt): void {
  pageAction('API Re-attempts', data)
}

export default hadReAttempt
