// import { Infos } from './types'

const createEvent = (data: { userName: string }): CustomEvent => {
  const event = new CustomEvent('hub-infos', {
    detail: data
  })

  return event
}

const dispatchEvent = (event: CustomEvent): void => {
  setTimeout(() => {
    document.dispatchEvent(event)
  }, 2000)
}

export { createEvent, dispatchEvent }
