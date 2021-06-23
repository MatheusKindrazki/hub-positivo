import React, { useRef, useEffect } from 'react'

import { OptionTypeBase } from 'react-select'
import { useField } from '@unform/core'

import {
  FormControl,
  FormHelperText,
  FormControlProps,
  FormLabel
} from '@chakra-ui/react'

import DefaultSelect, { PropsSelect } from '../../Select'

interface Props extends PropsSelect {
  name: string
  mb?: FormControlProps['mb']
  label?: string
}

const Select: React.FC<Props> = ({ name, mb, label, ...rest }) => {
  const selectRef = useRef(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return []
          }
          return ref?.state?.value?.map(
            (option: OptionTypeBase) => option.value
          )
        }
        if (!ref.state.value) {
          return ''
        }
        return ref.state.value.value
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
