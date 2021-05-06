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

let lastPath = ''
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

function gscOrquestrador(history: OrquestradorProps, cb: CBProps): void {
  const pathname = document.location.hash.replace('#', '')

  window.onload = async function () {
    setCount()
    instanceGsc()

    await delay(500)

    lastPath = pathname
    pageViewGsc(pathname)

    onSubmitGsc(cb)
  }

  history.listen(async e => {
    if (lastPath === e.pathname) return

    await removeGsc(() => instanceGsc())

    await delay(500)

    pageViewGsc(e.pathname)
    onSubmitGsc(cb)

    setCount()
  })
}

export default gscOrquestrador

export { setParamsGsc }
