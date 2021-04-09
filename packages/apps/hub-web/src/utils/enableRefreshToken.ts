import { store } from '~/store'

import roundHours from './formatData/roundHours'

const enableRefreshToken = (exp: number): boolean => {
  const expirationDateInMs = exp * 1000
  const { enableMiddlewareRefreshToken } = store.getState().global
  const date = new Date().getTime()
  const nowInMs = roundHours({ milliseconds: date }).getTime()
  console.log(expirationDateInMs, nowInMs)

  if (nowInMs >= expirationDateInMs && enableMiddlewareRefreshToken) {
    return true
  }
  return false
}

export { enableRefreshToken }
