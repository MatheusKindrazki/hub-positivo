import React from 'react'

import { forwardRef } from '@chakra-ui/react'

import { PropsSelect as Props } from './variants/Normal'
import options from './options'
export interface PropsSelect extends Props {
  variant: 'normal' | 'primary' | 'secondary'
  error?: boolean
}

const Select = forwardRef<PropsSelect, 'select'>((props, ref) => {
  const { variant } = props

  const RenderSelect = options[variant]

  return <RenderSelect ref={ref} {...props} />
})

export default Select
