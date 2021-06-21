import React, { useState } from 'react'

import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'

import 'react-datepicker/dist/react-datepicker.css'
import { useMediaQuery } from '@psdhub/common/hooks'

import Container from './styles'

type Props = Partial<ReactDatePickerProps>

const Datepicker: React.FC<Props> = ({ ...props }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [isDesktop] = useMediaQuery('(min-width: 615px)')

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
        monthsShown={isDesktop ? 2 : 1}
        selectsRange
        locale={pt}
        inline
        calendarClassName={'datepicker-calendar'}
        formatWeekDay={nameOfDay => nameOfDay.substr(0, 1).toUpperCase()}
      />
    </Container>
  )
}

export default Datepicker
