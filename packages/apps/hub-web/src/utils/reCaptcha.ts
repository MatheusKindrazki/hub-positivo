import { format } from 'date-fns'
import lscache from 'lscache'

const dateFormat = 'dd MM yyyy, H:mm:ss'

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
  // const response = await fetch(
  //   process.env.REACT_APP_RECAPTCHA_VERIFY_URL || '',
  //   {
  //     method: 'post',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  //     },
  //     body: `secret=${process.env.REACT_APP_RECAPTCHA_SECRET_KEY}&response=${token}`
  //   }
  // )
  console.log('retorno da api:', token)
  lscache.remove('loginStrikes')
}
