import { InformationsProps, SendInfos } from './types'

export const getCommunicatorName = '@psdhub:informations:get'
export const postCommunicatorName = '@psdhub:informations:post'

const getInformations = <T>(data: InformationsProps): void | T => {
  const getEvent = new CustomEvent(getCommunicatorName)

  document.dispatchEvent(getEvent)

  document.addEventListener(postCommunicatorName, (e: CustomEventInit) => {
    data(e.detail as SendInfos)
  })

  return data({} as SendInfos)
}

const postInformations = (data: SendInfos): void => {
  const getEvent = new CustomEvent(postCommunicatorName, { detail: data })

  document.dispatchEvent(getEvent)

  document.addEventListener(getCommunicatorName, () => {
    document.dispatchEvent(getEvent)
  })
}

export { getInformations, postInformations }