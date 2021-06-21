import React from 'react'

import { forwardRef } from '@chakra-ui/react'

import { OptionTreeViewProps } from './components/MenuList/types'
import MenuList from './components/MenuList'
import { PropsSelect } from '../Select/variants/Normal'
import options from '../Select/options'

export type OmitDefaultValue = Omit<PropsSelect<any>, 'defaultValue'>
export interface Props extends OmitDefaultValue {
  options?: OptionTreeViewProps[]
  defaultValue?: string[]
  variant: 'normal' | 'primary' | 'secondary'
}

const Select = forwardRef<Props, 'select'>((props, ref) => {
  const SelectHub = options[props.variant]

  return (
    <SelectHub
      defaultMenuIsOpen
      components={{ MenuList }}
      ref={ref}
      {...props}
    />
  )
})

export default Select
