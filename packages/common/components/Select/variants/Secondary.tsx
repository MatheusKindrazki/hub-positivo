import React from 'react'

import Select, { Props, mergeStyles, NonceProvider } from 'react-select'

import { useTheme } from '@psdhub/common/layout/styles'
import { generateKey } from '@psdhub/common/layout/Provider/config'

import { forwardRef } from '@chakra-ui/react'

import { secondary } from '../styles'

export interface PropsSelect extends Props {
  inputHeight?: number
  styles?: Props['styles']
  error?: boolean
}

const HubSelect = forwardRef<PropsSelect, 'select'>((props, ref) => {
  const { className, inputHeight, styles, error, ...rest } = props

  const theme = useTheme()

  const cssKey = `hub-secondary-${generateKey}`

  return (
    <NonceProvider cacheKey={cssKey} nonce="hub-secondary">
      <Select
        ref={ref}
        styles={mergeStyles(
          { ...secondary({ theme, inputHeight, error }) },
          { ...styles }
        )}
        clearable
        noOptionsMessage={() => 'Nada encontrado =('}
        className={className}
        classNamePrefix="hub-secondary"
        isSearchable
        {...rest}
      />
    </NonceProvider>
  )
})

export default HubSelect
