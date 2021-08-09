import React, { useRef, useEffect, useCallback, useState } from 'react'

import { format, isDate } from 'date-fns'
import { useField } from '@unform/core'

import { Box } from '@psdhub/common/components'

import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react'

import { Container } from './styles'
import Icon from './components/Icon'
import ContainerOptions from './components/ContainerOptions'
import DatepickerHub, { DatepickerHandlers } from '../../Datepicker'

interface Props {
  name: string
  placeholder?: string
  hideSelected?: boolean
}

const Datepicker: React.FC<Props> = ({
  name,
  hideSelected,
  placeholder = 'Selecione uma data'
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const datepickerRef = useRef<DatepickerHandlers>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, registerField } = useField(name)

  const handleRenderValue = useCallback(
    (dates: [Date, Date]) => {
      const [start, end] = dates

      if (!start && !end) return placeholder

      if (hideSelected) return placeholder

      const formatStart = isDate(start)
        ? format(start as Date, 'dd/MM/yyyy')
        : 'dd/MM/yyyy'

      const formatEnd = isDate(end)
        ? format(end as Date, 'dd/MM/yyyy')
        : 'dd/MM/yyyy'

      if (inputRef.current) {
        inputRef.current.value = `de ${formatStart} a ${formatEnd}`
      }
    },
    [hideSelected, placeholder]
  )

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      getValue: () => {
        if (!startDate && !endDate) return undefined

        const start = format(startDate as Date, 'MM/dd/yyyy')
        const end = format(endDate as Date, 'MM/dd/yyyy')

        return {
          checked: [`de ${start} a ${end}`],
          raw: [startDate, endDate]
        }
      },
      setValue: (_ref, value) => {
        const dates = value as any
        setStartDate(dates[0])
        setEndDate(dates[1])

        handleRenderValue(dates)
      }
    })
  }, [endDate, startDate, fieldName, handleRenderValue, registerField])

  const handleSelectDates = useCallback(dates => {
    handleRenderValue(dates)

    const [start, end] = dates

    setStartDate(start)

    setEndDate(end)
  }, [])

  return (
    <Container ref={containerRef}>
      <Popover isLazy>
        <PopoverTrigger>
          <Box className="hub-date-picker-header">
            <Box role="button" className="hub-date-picker-header-title">
              <Box pointerEvents="none" className="hub-control">
                <input ref={inputRef} defaultValue={placeholder} type="text" />
              </Box>
            </Box>
            <Icon />
          </Box>
        </PopoverTrigger>
        <PopoverContent
          w="auto"
          _focus={{ outline: 'none', boxShadow: 'none' }}
          outline="none"
          boxShadow="none"
          bg="transparent"
          border="none"
        >
          <ContainerOptions className="datepicker-dropdown">
            <DatepickerHub
              startDate={startDate}
              endDate={endDate}
              onChange={handleSelectDates}
            />
          </ContainerOptions>
        </PopoverContent>
      </Popover>
    </Container>
  )
}

export default Datepicker
