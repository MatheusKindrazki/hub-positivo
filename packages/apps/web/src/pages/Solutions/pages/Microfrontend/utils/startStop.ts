import { delay } from '@psdhub/common/utils'

declare global {
  interface Window {
    loadedMicroFrontend: boolean
  }
}

async function startApp(): Promise<void> {
  if (!window.loadMicrofrontend) {
    await delay(800)

    return startApp()
  }

  window.loadedMicroFrontend = true

  window?.loadMicrofrontend()
}

async function stopApp(): Promise<void> {
  if (!window.unLoadMicrofrontend) {
    await delay(800)

    return stopApp()
  }

  window?.unLoadMicrofrontend()

  await delay(800)

  const voidFunction = () => {}

  window.loadMicrofrontend = voidFunction
  window.unLoadMicrofrontend = voidFunction

  window.loadedMicroFrontend = false
}

export { startApp, stopApp }
