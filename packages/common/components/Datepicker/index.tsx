import React, { forwardRef, useImperativeHandle, useState } from 'react'

import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'

import { useMediaQuery } from '@psdhub/common/hooks'

import 'react-datepicker/dist/react-datepicker.css'

import { Container } from './styles'

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

    const [isDesktop] = useMediaQuery('(min-width: 620px)')

    const onChange = (dates: [Date, Date]) => {
      const [startDate, endDate] = dates
      setStart(startDate)
      setEnd(endDate)
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
            setStart(range.start)
            setEnd(range.end)
          }
        }
      }
    })

    return (
      <Container>
        <ReactDatePicker
          ref={ref as any}
          onChange={onChange}
          selected={null}
          startDate={start}
          endDate={end}
          {...props}
          selectsRange
          locale={pt}
          inline
          monthsShown={isDesktop ? 2 : 1}
          calendarClassName={'datepicker-calendar'}
          formatWeekDay={nameOfDay => nameOfDay.substr(0, 1).toUpperCase()}
          dateFormatCalendar="MMMM"
        />
      </Container>
    )
  }
)

export default Datepicker
