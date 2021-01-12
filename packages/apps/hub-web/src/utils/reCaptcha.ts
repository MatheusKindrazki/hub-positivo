import lscache from 'lscache'
import moment from 'moment'

const dateFormat = 'DD/MM/YYYY, H:mm:ss'

export const checkForStrikes = (): boolean => {
  const strikes = lscache.get('loginStrikes' || '{}')
  console.log(`strike number ${strikes?.length}`)
  if (strikes?.length >= 3) {
    return true
  }
  return false
}

export const storeStrike = (): void => {
  const strikes = lscache.get('loginStrikes' || '{}')
  const time = moment().format(dateFormat)
  if (strikes?.length) {
    lscache.set('loginStrikes', [...strikes, { timestamp: time }], 120)
  } else {
    lscache.set('loginStrikes', [{ timestamp: time }], 120)
  }
}

export const clearStrikes = (): void => {
  lscache.remove('loginStrikes')
}

export const handleCaptcha = (value: any): void => {
  // fetch com post do token para api
  console.log('token:', value)
}
