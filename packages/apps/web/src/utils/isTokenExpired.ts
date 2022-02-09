import roundHours from '~/utils/formatData/roundHours'

export const isTokenExpired = (exp: number): boolean => {
  if (exp <= 0) return true

  const actualTime = new Date().getTime()

  const { milliseconds: expToken } = roundHours({
    milliseconds: exp * 1000
  })

  const { milliseconds: actualTimeInMs } = roundHours({
    milliseconds: actualTime
  })

  if (actualTimeInMs >= expToken) return true

  return false
}
