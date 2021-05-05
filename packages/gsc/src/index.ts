import { History, LocationState } from 'history'

import { instanceGsc, removeGsc, setParamsGsc, pageViewGsc } from './services'

type OrquestradorProps = History<LocationState>

let historyLength = 0
window.pageviewCount = 0

const setCount = (): void => {
  historyLength = historyLength + 1
  window.pageviewCount = historyLength
}

function gscOrquestrador(history: OrquestradorProps): void {
  window.onload = function () {
    setCount()
    instanceGsc()
  }

  history.listen(async e => {
    await removeGsc(() => instanceGsc())

    pageViewGsc(e.pathname)

    setCount()
  })
}

export default gscOrquestrador

export { setParamsGsc }
