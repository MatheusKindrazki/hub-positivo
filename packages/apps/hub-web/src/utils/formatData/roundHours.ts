import { startOfHour } from 'date-fns'

interface TesteProps {
  milliseconds: number
}
export default (data: TesteProps): Date => {
  const formatDate = new Date(data.milliseconds)

  return startOfHour(formatDate)
}
