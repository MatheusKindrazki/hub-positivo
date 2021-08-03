import React, { useRef, useEffect } from 'react'

import { useField } from '@unform/core'

import {
  FormControl,
  FormHelperText,
  FormControlProps,
  FormLabel
} from '@chakra-ui/react'

import DefaultSelect, { SelectProps, SelectRefProps } from '../../NewSelect'

interface Props extends SelectProps {
  name: string
  mb?: FormControlProps['mb']
  label?: string
}

const Select: React.FC<Props> = ({ name, mb, label, ...rest }) => {
  const selectRef = useRef<SelectRefProps>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: ref => {
        const getValues = ref.getValue()

        return getValues
      },
      setValue: (ref: any, value) => {
        if (!value) return ''

        ref.select.setValue(value)
      }
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <FormControl mb={mb}>
      {label && (
        <FormLabel color="blue.500" fontWeight="400">
          {label}
        </FormLabel>
      )}
      <DefaultSelect
        defaultValue={defaultValue}
        error={!!error}
        ref={selectRef}
        {...rest}
      />
      {!!error && (
        <FormHelperText data-testid="input-error" ml="1" color="red.300">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default Select
