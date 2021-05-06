import { History, LocationState } from 'history'

import { instanceGsc, removeGsc, setParamsGsc, pageViewGsc } from './services'

type OrquestradorProps = History<LocationState>

let lastPath = document.location.hash.replace('#', '')
let historyLength = 0

window.pageviewCount = 0

const setCount = (): void => {
  historyLength = historyLength + 1
  window.pageviewCount = historyLength
}

/*
  ! Nota: Os delays não importantes para
  ! que o ciclo de vida do gsc não seja interrompido
  ! na remoção por completo dos elementos e scripts!
*/

function gscOrquestrador(history: OrquestradorProps): void {
  window.onload = async function () {
    setCount()
    instanceGsc()

    pageViewGsc(lastPath)
  }

  history.listen(async e => {
    if (lastPath === e.pathname) return

    await removeGsc(() => instanceGsc())

    lastPath = e.pathname

    setCount()
    pageViewGsc(e.pathname)
  })
}

export default gscOrquestrador

export { setParamsGsc }
