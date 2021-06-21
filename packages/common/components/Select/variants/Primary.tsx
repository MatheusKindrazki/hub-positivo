import React from 'react'

import Select, { Props, mergeStyles } from 'react-select'

import { useTheme } from '@psdhub/common/layout/styles'

import { forwardRef } from '@chakra-ui/react'

import { primary } from '../styles'
import { prefixClass } from '../options'

export type PropsSelect<T> = Props & {
  inputHeight?: number
  styles?: Props['styles']
  defaultValue?: T
  error?: boolean
  isMulti?: boolean
}
const HubSelectPrimary = forwardRef<PropsSelect, 'select'>((props, ref) => {
  const { className, inputHeight, styles, error, isMulti, ...rest } = props

  const theme = useTheme()

  return (
    <Select
      isMulti={isMulti}
      ref={ref}
      styles={mergeStyles(
        { ...primary({ theme, inputHeight, error }) },
        { ...styles }
      )}
      clearable
      noOptionsMessage={() => 'Nada encontrado =('}
      className={className}
      classNamePrefix={`${prefixClass}-primary`}
      isSearchable
      {...rest}
    />
  )
})

export default HubSelectPrimary
