import React from 'react'

import { Props } from 'react-select'

import { forwardRef } from '@chakra-ui/react'

import options from './options'

export type PropsSelect = Props & {
  variant: 'normal' | 'primary' | 'secondary'
}

const Select = forwardRef<PropsSelect, 'select'>((props, ref) => {
  const { variant } = props

  const RenderSelect = options[variant]

  return <RenderSelect ref={ref} {...props} />
})

export default Select
