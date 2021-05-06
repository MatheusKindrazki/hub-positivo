import { History, LocationState } from 'history'

import delay from '@psdhub/common/utils/delay'

import {
  instanceGsc,
  removeGsc,
  setParamsGsc,
  pageViewGsc,
  onSubmitGsc
} from './services'

type OrquestradorProps = History<LocationState>

// onSubmitCallBack
type CBProps = (id: number, data: any) => void

let historyLength = 0
window.pageviewCount = 0

const setCount = (): void => {
  historyLength = historyLength + 1
  window.pageviewCount = historyLength
}

function gscOrquestrador(history: OrquestradorProps, cb: CBProps): void {
  const pathname = document.location.hash.replace('#', '')

  window.onload = async function () {
    setCount()
    instanceGsc()

    await delay(500)

    pageViewGsc(pathname)

    onSubmitGsc(cb)
  }

  history.listen(async e => {
    await removeGsc(() => instanceGsc())

    pageViewGsc(e.pathname)
    onSubmitGsc(cb)

    setCount()
  })
}

export default gscOrquestrador

export { setParamsGsc }
