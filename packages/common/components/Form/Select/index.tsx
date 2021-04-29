import React, { useRef, useEffect } from 'react'

import { OptionTypeBase } from 'react-select'
import { useField } from '@unform/core'

import { FormControl, FormHelperText, FormControlProps } from '@chakra-ui/react'

import DefaultSelect, { PropsSelect } from '../../Select'

interface Props extends PropsSelect {
  name: string
  mb?: FormControlProps['mb']
}

const Select: React.FC<Props> = ({ name, mb, ...rest }) => {
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
          return ref.state.value.map((option: OptionTypeBase) => option.value)
        }
        if (!ref.state.value) {
          return ''
        }
        return ref.state.value.value
      }
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <FormControl mb={mb}>
      <DefaultSelect defaultValue={defaultValue} ref={selectRef} {...rest} />
      {!!error && (
        <FormHelperText data-testid="input-error" color="red.300">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default Select
