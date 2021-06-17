import { delay } from '@psdhub/common/utils'

async function startApp(): Promise<void> {
  if (!window.loadMicrofrontend) {
    await delay(500)

    return startApp()
  }

  window?.loadMicrofrontend()
}

async function stopApp(): Promise<void> {
  if (!window.unLoadMicrofrontend) {
    await delay(500)

    return stopApp()
  }

  window?.unLoadMicrofrontend()

  await delay(600)

  const voidFunction = () => {}

  window.loadMicrofrontend = voidFunction
  window.unLoadMicrofrontend = voidFunction
}

export { startApp, stopApp }
