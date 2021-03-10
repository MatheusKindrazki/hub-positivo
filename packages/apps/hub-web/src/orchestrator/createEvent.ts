import { Infos } from './types'

const createEvent = (data: Infos): CustomEvent => {
  const event = new CustomEvent('hub-infos', {
    detail: data
  })

  return event
}

const dispatchEvent = (event: CustomEvent): void => {
  document.dispatchEvent(event)
}

export { createEvent, dispatchEvent }
