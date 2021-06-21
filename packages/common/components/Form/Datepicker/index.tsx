import React, { useRef, useEffect } from 'react'

import { useField } from '@unform/core'

import { FormControl, FormLabel } from '@chakra-ui/react'

import DatepickerHub, { DatepickerHandlers, DateRange } from '../../Datepicker'
import { Text } from '../../'

interface Props {
  name: string
  label?: string
}

const Datepicker: React.FC<Props> = ({ name, label }) => {
  const datepickerRef = useRef<DatepickerHandlers>(null)

  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      getValue: () => datepickerRef.current?.getData(),
      setValue: (_ref, value) =>
        datepickerRef.current?.setData(value as DateRange)
    })
  }, [fieldName, registerField])

  return (
    <FormControl>
      {label && (
        <FormLabel color="blue.500" fontWeight="400">
          {label}
        </FormLabel>
      )}
      <DatepickerHub ref={datepickerRef} />
      {error && <Text color="red.500">{error}</Text>}
    </FormControl>
  )
}

export default Datepicker
