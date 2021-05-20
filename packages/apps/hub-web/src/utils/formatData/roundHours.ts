import { startOfHour } from 'date-fns'

interface DateProps {
  milliseconds: number
}

interface ReturnDateProps extends Date {
  milliseconds: number
}

export default (data: DateProps): ReturnDateProps => {
  const formatDate = new Date(data.milliseconds)

  const hour = startOfHour(formatDate)

  return {
    milliseconds: hour.getTime(),
    ...hour
  }
}
