import React, { forwardRef, useImperativeHandle, useState } from 'react'

import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'

import 'react-datepicker/dist/react-datepicker.css'
import { useMediaQuery } from '@psdhub/common/hooks'

import Container from './styles'

export type DateRange = { start: Date; end: Date }
export interface DatepickerHandlers {
  getData(): DateRange | undefined
  setData(range: DateRange): void
}

interface DatepickerProps extends Partial<ReactDatePickerProps> {
  error?: string
}

const Datepicker = forwardRef<DatepickerHandlers, DatepickerProps>(
  (props, ref) => {
    const [start, setStart] = useState<Date | null>(null)
    const [end, setEnd] = useState<Date | null>(null)

    const [isDesktop] = useMediaQuery('(min-width: 615px)')
    const onChange = (dates: any) => {
      const [start, end] = dates
      setStart(start)
      setEnd(end)
    }

    useImperativeHandle(ref, () => {
      return {
        getData: () => {
          if (start && end) {
            return { start, end }
          }
        },
        setData: range => {
          if (range?.start && range?.end) {
            setStart(start)
            setEnd(end)
          }
        }
      }
    })

    return (
      <Container mb="0.5rem">
        <ReactDatePicker
          {...props}
          ref={ref as any}
          onChange={onChange}
          selected={start}
          startDate={start}
          endDate={end}
          selectsRange
          locale={pt}
          inline
          monthsShown={isDesktop ? 2 : 1}
          calendarClassName={'datepicker-calendar'}
          formatWeekDay={nameOfDay => nameOfDay.substr(0, 1).toUpperCase()}
        />
      </Container>
    )
  }
)

export default Datepicker
