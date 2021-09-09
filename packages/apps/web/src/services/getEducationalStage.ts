import { store } from '~/store'

import { delay } from '@psdhub/common/utils'

export async function getEducationalStage(): Promise<string> {
  const { level } = store.getState().educationalStage

  await delay(200)

  if (!level) {
    return await getEducationalStage()
  }

  return level
}
