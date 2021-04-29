import React from 'react'

import Select, { Props, mergeStyles, NonceProvider } from 'react-select'

import { useTheme } from '@psdhub/common/layout/styles'
import { generateKey } from '@psdhub/common/layout/Provider/config'

import { forwardRef } from '@chakra-ui/react'

import { primary } from '../styles'

export interface PropsSelect extends Props {
  inputHeight?: number
  styles?: Props['styles']
}

const HubSelect = forwardRef<PropsSelect, 'select'>((props, ref) => {
  const { className, inputHeight, styles, ...rest } = props

  const theme = useTheme()

  const cssKey = `hub-primary-${generateKey}`

  return (
    <NonceProvider cacheKey={cssKey} nonce="hub-primary">
      <Select
        ref={ref}
        styles={mergeStyles({ ...primary(theme, inputHeight) }, { ...styles })}
        clearable
        noOptionsMessage={() => 'Nada encontrado =('}
        className={className}
        classNamePrefix="hub-primary"
        isSearchable
        {...rest}
      />
    </NonceProvider>
  )
})

export default HubSelect
