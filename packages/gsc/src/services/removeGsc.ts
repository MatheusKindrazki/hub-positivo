import delay from '@psdhub/common/utils/delay'

import closeModalsGsc from './closeModalGsc'

type RemoveGSCProps = () => void

export async function removeGsc(fn: RemoveGSCProps): Promise<void> {
  closeModalsGsc()

  await delay(1000)

  window.gsc = undefined

  const scripts = document.querySelectorAll('script')

  scripts.forEach(script => {
    const gsc = 'getsitecontrol'

    if (script.src.includes(gsc)) {
      script.remove()
    }
  })

  await delay(500)

  fn()
}

export default removeGsc
