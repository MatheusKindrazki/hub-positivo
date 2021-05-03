import React from 'react'

import Select, { Props, mergeStyles, NonceProvider } from 'react-select'

import { useTheme } from '@psdhub/common/layout/styles'
import { generateKey } from '@psdhub/common/layout/Provider/config'

import { forwardRef } from '@chakra-ui/react'

import { normal } from '../styles'

export interface PropsSelect extends Props {
  inputHeight?: number
  styles?: Props['styles']
  error?: boolean
}

const HubSelect = forwardRef<PropsSelect, 'select'>((props, ref) => {
  const { className, inputHeight, styles, error, ...rest } = props

  const theme = useTheme()

  const cssKey = `hub-normal-${generateKey}`

  return (
    <NonceProvider cacheKey={cssKey} nonce="hub-normal">
      <Select
        ref={ref}
        styles={mergeStyles(
          { ...normal({ theme, inputHeight, error }) },
          { ...styles }
        )}
        clearable
        noOptionsMessage={() => 'Nada encontrado =('}
        className={className}
        classNamePrefix="hub-normal"
        isSearchable
        {...rest}
      />
    </NonceProvider>
  )
})

export default HubSelect
