import React from 'react'

import Select, { Props, mergeStyles, NonceProvider } from 'react-select'

import { useTheme } from '@psdhub/common/layout/styles'

import { forwardRef } from '@chakra-ui/react'

import { primary } from '../styles'
import { prefixClass } from '../options'

export type PropsSelect = Props & {
  inputHeight?: number
  styles?: Props['styles']
  error?: boolean
  isMulti?: boolean
}
const HubSelect = forwardRef<PropsSelect, 'select'>((props, ref) => {
  const { className, inputHeight, styles, error, isMulti, ...rest } = props

  const theme = useTheme()

  return (
    <NonceProvider cacheKey={`${prefixClass}-primary`} nonce="primary">
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
    </NonceProvider>
  )
})

export default HubSelect
