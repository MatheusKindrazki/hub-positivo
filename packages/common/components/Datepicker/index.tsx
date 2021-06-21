import React, { useState } from 'react'

import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'

import 'react-datepicker/dist/react-datepicker.css'

import Container from './styles'

type Props = Partial<ReactDatePickerProps>

const Datepicker: React.FC<Props> = ({ ...props }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const onChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    console.log({ start }, { end })
  }

  return (
    <Container>
      <ReactDatePicker
        {...props}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
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

export default Datepicker
