import moment from 'moment'

const dateFormat = 'DD/MM/YYYY, H:mm:ss'

const initStrikeLog = (): void => {
  const time = moment().format(dateFormat)
  localStorage.setItem('loginStrikes', JSON.stringify([{ timestamp: time }]))
}

const saveStrike = (strikes: [{ timestamp: string }]): void => {
  const time = moment().format(dateFormat)
  strikes.push({ timestamp: time })
  const data = JSON.stringify(strikes)
  localStorage.setItem('loginStrikes', data)
}

const filterStrikes = (strike: { timestamp: string }): boolean => {
  const validationTime = moment().subtract(2, 'hours').format(dateFormat)
  console.log(
    `strike timestamp: ${
      strike.timestamp
    }, validation time: ${validationTime}, comparison: ${
      new Date(strike.timestamp).valueOf() > new Date(validationTime).valueOf()
    }`
  )
  return (
    new Date(strike.timestamp).valueOf() > new Date(validationTime).valueOf()
  )
}

const checkForStrikes = (
  callback: any,
  strikes: [{ timestamp: string }]
): void => {
  const filteredStrikes = strikes?.filter(filterStrikes)
  localStorage.setItem('loginStrikes', JSON.stringify(filteredStrikes))
  console.log(`strike number ${filteredStrikes.length}`)
  if (filteredStrikes?.length >= 3) {
    callback()
  }
}

export const storeStrike = (callback: any): void => {
  const strikes = JSON.parse(localStorage.getItem('loginStrikes') || '{}')
  strikes === null ? initStrikeLog() : saveStrike(strikes)
  checkForStrikes(callback, strikes)
}

export const handleCaptcha = (value: string | null): void => {
  // fetch com post do token para api
  console.log('token:', value)
}
