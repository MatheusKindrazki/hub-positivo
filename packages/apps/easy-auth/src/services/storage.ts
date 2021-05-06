import { AuthContextParams } from '../context/authContext'

const STORAGE_KEY = '@psdhub/easyauth'

const getAuth = (): AuthContextParams => {
  const storage = localStorage.getItem(STORAGE_KEY)

  if (!storage) return {} as AuthContextParams

  return JSON.parse(storage) as AuthContextParams
}

// const setAuth = () => {}

export { getAuth }
