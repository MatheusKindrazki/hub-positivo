import delay from '@hub/common/utils/delay'

async function onSubmitInstance(): Promise<void> {
  if (!window?.gsc) {
    await delay(500)
    return onSubmitInstance()
  }

  window?.gsc('onSubmit', (id: number, data: any) => {
    const sendEvent = new CustomEvent('@psdhub:gsc:submit', {
      detail: { id, data }
    })

    document.dispatchEvent(sendEvent)
  })
}

export default onSubmitInstance
