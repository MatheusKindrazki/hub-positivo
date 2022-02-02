import { format } from 'date-fns'

export const formatDate = (date: Date): string => {
  return `${format(new Date(date), 'dd/MM')} às ${format(
    new Date(date),
    'hh:mm'
  )}`
}
