import { SendInfos } from '@psdhub/helpers/src/utils/types'

const STORAGE_KEY = '@psdhub/easyauth'

const getAuth = (): SendInfos => {
  const storage = localStorage.getItem(STORAGE_KEY)

  if (!storage) return {} as SendInfos

  return JSON.parse(storage) as SendInfos
}

// const setAuth = () => {}

export { getAuth }
