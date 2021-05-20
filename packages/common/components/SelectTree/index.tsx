import React from 'react'

import { forwardRef } from '@chakra-ui/react'

import SelectHub, { PropsSelect } from '../Select'

const Brasil = (props: any) => {
  console.log(props)
  return <div>brasil de mais</div>
}

const Select = forwardRef<PropsSelect, 'select'>((props, ref) => {
  return (
    <SelectHub
      components={{ Group: Brasil, Option: Brasil }}
      ref={ref}
      {...props}
    />
  )
})

export default Select
