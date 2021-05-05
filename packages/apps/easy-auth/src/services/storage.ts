import { SendInfos } from '@psdhub/helpers/src/utils/types'

const STORAGE_KEY = '@psdhub/easyauth'

const getAuth = (): SendInfos => {
  const storage = localStorage.getItem(STORAGE_KEY)

  return storage
}

const setAuth = () => {}

export { getAuth }
