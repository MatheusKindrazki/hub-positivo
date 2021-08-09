import React, { useRef, useEffect } from 'react'

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

  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: true })

  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      getValue: () => datepickerRef.current?.getData(),
      setValue: (_ref, value) => {
        if (Array.isArray(value)) {
          datepickerRef.current?.setData({
            start: value[0],
            end: value[1]
          })

          return
        }

        datepickerRef.current?.setData(value as DateRange)
      }
    })
  }, [fieldName, registerField])

  const renderValues = () => {
    const date = datepickerRef.current?.getData()

    if (isOpen || !date) return placeholder

    if (hideSelected) return placeholder

    const start = format(date.start, 'MM/dd/yyyy')
    const end = format(date.end, 'MM/dd/yyyy')

    return (
      <Box d="inline" as="span">
        de{' '}
        <Box fontWeight="500" as="span">
          {start}
        </Box>{' '}
        a{' '}
        <Box fontWeight="500" as="span">
          {end}
        </Box>
      </Box>
    )
  }

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
