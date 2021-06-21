import React from 'react'

import Select, { Props, mergeStyles } from 'react-select'

import { useTheme } from '@psdhub/common/layout/styles'

import { forwardRef } from '@chakra-ui/react'

import { secondary } from '../styles'
import { prefixClass } from '../options'

export type PropsSelect<T> = Props & {
  inputHeight?: number
  styles?: Props['styles']
  defaultValue?: T
  error?: boolean
  isMulti?: boolean
}

const HubSelectSecondary = forwardRef<PropsSelect, 'select'>((props, ref) => {
  const { className, inputHeight, styles, isMulti, error, ...rest } = props

  const theme = useTheme()

  return (
    <Select
      ref={ref}
      isMulti={isMulti}
      styles={mergeStyles(
        { ...secondary({ theme, inputHeight, error }) },
        { ...styles }
      )}
      clearable
      noOptionsMessage={() => 'Nada encontrado =('}
      className={className}
      classNamePrefix={`${prefixClass}-secondary`}
      isSearchable
      {...rest}
    />
  )
})

export default HubSelectSecondary
