import lscache from 'lscache'
import { format } from 'date-fns'
import { ApiResponse } from 'apisauce'

import { getInstance } from '@psdhub/api'

const dateFormat = 'dd MM yyyy, H:mm:ss'

export const checkForStrikes = (): boolean => {
  const strikes = lscache.get('loginStrikes')
  if (strikes?.length >= 3) {
    return true
  }
  return false
}

export const storeStrike = (): void => {
  const strikes = lscache.get('loginStrikes')
  const time = format(new Date(), dateFormat)
  if (strikes?.length) {
    lscache.set('loginStrikes', [...strikes, { timestamp: time }], 120)

    return
  }

  lscache.set('loginStrikes', [{ timestamp: time }], 120)
}

export const clearStrikes = (): void => {
  lscache.remove('loginStrikes')
}

export const handleCaptcha = async (token: null | string): Promise<boolean> => {
  const api = getInstance('default')

  const response = await api.get('Captcha/Validate', {
    token
  })

  const { data } = response as ApiResponse<boolean>

  if (data) lscache.remove('loginStrikes')

  return data || false
}
