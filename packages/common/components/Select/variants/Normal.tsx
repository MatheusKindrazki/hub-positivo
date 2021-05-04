import React from 'react'

import Select, { Props, mergeStyles } from 'react-select'

import { useTheme } from '@psdhub/common/layout/styles'

import { forwardRef } from '@chakra-ui/react'

import { normal } from '../styles'
import { prefixClass } from '../options'
export interface PropsSelect extends Props {
  inputHeight?: number
  styles?: Props['styles']
  error?: boolean
}

const HubSelect = forwardRef<PropsSelect, 'select'>((props, ref) => {
  const { className, inputHeight, styles, error, ...rest } = props

  const theme = useTheme()

  return (
    <Select
      ref={ref}
      styles={mergeStyles(
        { ...normal({ theme, inputHeight, error }) },
        { ...styles }
      )}
      clearable
      noOptionsMessage={() => 'Nada encontrado =('}
      className={className}
      classNamePrefix={`${prefixClass}-normal`}
      isSearchable
      {...rest}
    />
  )
})

export default HubSelect
