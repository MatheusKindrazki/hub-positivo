import { pageAction } from '@psdhub/newrelic'
import {
  communicationURLs,
  statusCodeCondition,
  Variant,
  getInstance
} from '@psdhub/api'
interface HadReAttempt {
  attempt: number
  url: string
  error?: string
  status: number
}

function hadReAttempt(data: HadReAttempt): void {
  pageAction('API Re-attempts', data)
}

Object.keys(communicationURLs).forEach(key => {
  const instanceKey = key as Variant

  getInstance(instanceKey).addResponseTransform(transform => {
    const { status } = transform

    if (statusCodeCondition.includes(status as number)) {
      console.log('entrou aqui')
    }
  })
})

export default hadReAttempt
