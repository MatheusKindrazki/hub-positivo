import delay from '@psdhub/common/utils/delay'

import closeModalsGsc from './closeModalGsc'

type RemoveGSCProps = () => void

export async function removeGsc(fn: RemoveGSCProps): Promise<void> {
  closeModalsGsc()

  await delay(1000)

  window.gsc = undefined

  const scripts = document.querySelectorAll('script')

  const iframes = document.querySelectorAll('iframe')

  // ?remove scripts instanciados pelo GSC
  scripts.forEach(script => {
    const gsc = 'getsitecontrol'

    if (script.src.includes(gsc)) {
      script.remove()
    }
  })

  // ?remove iframes instanciados pelo GSC
  iframes.forEach(iframe => {
    const void0 = 'javascript:void(0)'

    if (iframe.src.includes(void0)) {
      iframe.remove()
    }
  })

  console.info('GSC: Removendo SCRIPTS')

  fn()
}

export default removeGsc
