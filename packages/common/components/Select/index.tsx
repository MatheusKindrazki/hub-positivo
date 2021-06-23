import React from 'react'

import { Props as RSProps } from 'react-select'

import { forwardRef } from '@chakra-ui/react'

import { PropsSelect as Props } from './variants/Normal'
import options from './options'
import Divider from '../Divider'

export interface PropsSelect extends Props<RSProps['defaultValue']> {
  variant: 'normal' | 'primary' | 'secondary' | 'checkbox'
  error?: boolean
  divider?: boolean
}

const GroupHeading: React.FC = (props: any) => {
  return (
    <Divider
      display={props?.id?.includes('0-heading') ? 'none' : 'block'}
      mt="-3"
      mb="2"
      borderColor="gray.500"
    />
  )
}

const Select = forwardRef<PropsSelect, 'select'>((props, ref) => {
  const { variant, divider } = props

  const RenderSelect = options[variant]

  if (divider) {
    return <RenderSelect components={{ GroupHeading }} ref={ref} {...props} />
  }

  return <RenderSelect ref={ref} {...props} />
})

export default Select
