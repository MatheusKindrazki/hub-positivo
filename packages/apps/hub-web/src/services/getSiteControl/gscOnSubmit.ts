// utilizar formatacao dos dados quando a funcao estiver pronta

import trackWidgetSubmit from './trackWidgetSubmit'

const setGSCOnSubmit = (): void => {
  if (window.gsc) {
    window.gsc('onSubmit', trackWidgetSubmit)
  }
}

export default setGSCOnSubmit
