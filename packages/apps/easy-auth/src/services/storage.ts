import { SignInSuccess } from '../@types/auth'

const STORAGE_KEY = '@psdhub/easyauth'

type ItemsProps = {
  data?: SignInSuccess
  signed: boolean
  reducedToken: string
}

const getAuth = (): ItemsProps => {
  const storage = localStorage.getItem(STORAGE_KEY)

  if (!storage) return {} as ItemsProps

  return JSON.parse(storage) as ItemsProps
}

const setAuth = (data: ItemsProps): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export { getAuth, setAuth }
