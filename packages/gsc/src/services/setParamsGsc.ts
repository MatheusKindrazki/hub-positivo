import delay from '@hub/common/utils/delay'

async function setParamsGsc<T>(data: T): Promise<void> {
  await delay(500)

  if (!window?.gsc) {
    return setParamsGsc(data)
  }

  window.gsc('params', {
    ...data,
    page_view_count: window.pageviewCount
  })
}

export default setParamsGsc
