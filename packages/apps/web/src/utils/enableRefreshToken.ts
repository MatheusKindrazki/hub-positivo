import { store } from '~/store'

import { isTokenExpired } from './isTokenExpired'

const enableRefreshToken = (exp: number): boolean => {
  const { enableMiddlewareRefreshToken } = store.getState().global
  return enableMiddlewareRefreshToken && isTokenExpired(exp)
}

export { enableRefreshToken }
