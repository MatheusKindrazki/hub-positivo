import React from 'react'

import { forwardRef } from '@chakra-ui/react'

import MenuList, { OptionTreeViewProps } from './components/MenuList'
import SelectHub, { PropsSelect } from '../Select'

type PropsSelectOmitOptions = Exclude<PropsSelect, 'options'>
export interface Props extends PropsSelectOmitOptions {
  options?: OptionTreeViewProps[]
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
