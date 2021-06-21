import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'

import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'

import 'react-datepicker/dist/react-datepicker.css'

import Container from './styles'

export type DateRange = { start: Date; end: Date }
export interface DatepickerHandlers {
  getData(): DateRange | undefined
  setData(range: DateRange): void
}

type DatepickerProps = Partial<ReactDatePickerProps>

const Datepicker = forwardRef<DatepickerHandlers, DatepickerProps>(
  (props, ref) => {
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const onChange = (dates: any) => {
      const [start, end] = dates
      setStart(start)
      setEnd(end)
    }

    useEffect(() => {}, [start, end])

    useImperativeHandle(ref, () => {
      return {
        getData: () => {
          if (start && end) {
            return { start, end }
          }
        },
        setData: ({ start, end }) => {
          console.log(start, end)
          if (start && end) {
            setStart(start)
            setEnd(end)
          }
        }
      }
    })

    return (
      <Container>
        <ReactDatePicker
          {...props}
          ref={ref as any}
          selected={start}
          onChange={onChange}
          startDate={start}
          endDate={end}
          monthsShown={2}
          selectsRange
          locale={pt}
          inline
          dayClassName={() => 'datepicker-day'}
          weekDayClassName={() => 'datepicker-week-day'}
          calendarClassName={'datepicker-calendar'}
          formatWeekDay={nameOfDay => nameOfDay.substr(0, 1).toUpperCase()}
        />
      </Container>
    )
  }
)

export default Datepicker
