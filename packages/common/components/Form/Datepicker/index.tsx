import React, { useRef, useEffect, useState } from 'react'

import { format } from 'date-fns'
import { useField } from '@unform/core'

import { useDisclosure, useOnClickOutside } from '@psdhub/common/hooks'
import { Box } from '@psdhub/common/components'

import { Container } from './styles'
import Icon from './components/Icon'
import ContainerOptions from './components/ContainerOptions'
import DatepickerHub, { DatepickerHandlers, DateRange } from '../../Datepicker'

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
  const datepickerRef = useRef<DatepickerHandlers>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [date, setDate] = useState([] as Date[])

  const { isOpen, onToggle, onClose } = useDisclosure()

  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      getValue: () => {
        if (!date.length) return undefined

        const start = format(date[0], 'MM/dd/yyyy')
        const end = format(date[1], 'MM/dd/yyyy')

        return {
          checked: [`de ${start} a ${end}`],
          raw: [date[0], date[1]]
        }
      },
      setValue: (_ref, value) => setDate(value as any)
    })
  }, [fieldName, registerField, date])

  const renderValues = () => {
    if (isOpen || !date.length) return placeholder

    if (hideSelected) return placeholder

    const start = format(date[0], 'MM/dd/yyyy')
    const end = format(date[1], 'MM/dd/yyyy')

    return (
      <Box d="inline" as="span">
        <Box fontWeight="400" as="span" color="gray.500">
          de
        </Box>{' '}
        {start}{' '}
        <Box fontWeight="400" as="span" color="gray.500">
          a
        </Box>{' '}
        {end}
      </Box>
    )
  }

  useEffect(() => {
    if (isOpen) {
      datepickerRef.current?.setData({
        start: date[0] || undefined,
        end: date[1] || undefined
      })
    }
  }, [date, isOpen])

  useOnClickOutside(containerRef, onClose, 'click')

  return (
    <Container ref={containerRef}>
      <Box className="hub-date-picker-header">
        <Box
          role="button"
          className="hub-date-picker-header-title"
          onClick={onToggle}
        >
          <Box pointerEvents="none" className="hub-control">
            {renderValues()}
          </Box>
        </Box>
        <Icon />
      </Box>
      {isOpen && (
        <ContainerOptions className="datepicker-dropdown">
          <DatepickerHub ref={datepickerRef} />
        </ContainerOptions>
      )}
    </Container>
  )
}

export default Datepicker
