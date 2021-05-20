import { store } from '~/store'

import roundHours from './formatData/roundHours'

const enableRefreshToken = (exp: number): boolean => {
  const { enableMiddlewareRefreshToken } = store.getState().global
  const date = new Date().getTime()

  const expirationDateInMs = roundHours({
    milliseconds: exp * 1000
  }).milliseconds

  const nowInMs = roundHours({ milliseconds: date }).milliseconds

  if (nowInMs >= expirationDateInMs && enableMiddlewareRefreshToken) {
    return true
  }
  return false
}

export { enableRefreshToken }
