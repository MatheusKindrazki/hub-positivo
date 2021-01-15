import { format } from 'date-fns'
import lscache from 'lscache'

const dateFormat = 'dd MM yyyy, H:mm:ss'

export const checkForStrikes = (): boolean => {
  const strikes = lscache.get('loginStrikes' || '{}')
  if (strikes?.length >= 3) {
    return true
  }
  return false
}

export const storeStrike = (): void => {
  const strikes = lscache.get('loginStrikes' || '{}')
  const time = format(new Date(), dateFormat)
  if (strikes?.length) {
    lscache.set('loginStrikes', [...strikes, { timestamp: time }], 120)
  } else {
    lscache.set('loginStrikes', [{ timestamp: time }], 120)
  }
}

export const clearStrikes = (): void => {
  lscache.remove('loginStrikes')
}

export const handleCaptcha = async (token: null | string): Promise<void> => {
  // fetch com post do token para api
  const query = `token=${token}`
  const url = `${process.env.REACT_APP_RECAPTCHA_VERIFY_URL}?${query}`
  const response = await fetch(url, { method: 'GET' })
  const isHuman = await response.json()
  if (isHuman) lscache.remove('loginStrikes')
}
