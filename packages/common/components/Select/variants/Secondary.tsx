import React from 'react'

import Select, { Props, mergeStyles, NonceProvider } from 'react-select'

import { useTheme } from '@psdhub/common/layout/styles'

import { forwardRef } from '@chakra-ui/react'

import { secondary } from '../styles'
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
    <NonceProvider cacheKey={`${prefixClass}-secondary`} nonce="secondary">
      <Select
        ref={ref}
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
    </NonceProvider>
  )
})

export default HubSelect
