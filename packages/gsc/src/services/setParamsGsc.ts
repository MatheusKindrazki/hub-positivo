import delay from '@psdhub/common/utils/delay'

async function setParamsGsc<T>(data: T): Promise<void> {
  await delay(200)

  if (!window?.gsc) {
    return setParamsGsc(data)
  }

  console.info('GSC: Setando parametros')

  window.gsc('params', {
    ...data,
    page_view_count: window.pageviewCount
  })
}

export default setParamsGsc
