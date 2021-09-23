import { format } from 'date-fns'

export const formatDate = (date: Date): string => {
  return `${format(date, 'dd/MM')} às ${format(date, 'hh:mm')}`
}
