import React from 'react'

import { forwardRef } from '@chakra-ui/react'

import { OptionTreeViewProps } from './components/MenuList/types'
import MenuList from './components/MenuList'
import SelectHub, { PropsSelect } from '../Select'

type PropsSelectOmitOptions = Exclude<PropsSelect, 'options'>
export interface Props extends PropsSelectOmitOptions {
  options?: OptionTreeViewProps[]
  variant: Exclude<PropsSelectOmitOptions['variant'], 'checkbox'>
}

const Select = forwardRef<Props, 'select'>((props, ref) => {
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
