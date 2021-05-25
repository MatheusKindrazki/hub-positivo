import React from 'react'

import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

import { Box } from '@psdhub/common/components'

import GrabIcon from '~/components/GrabIcon'

interface OrderProps {
  order: number
  dragHandleProps?: DraggableProvidedDragHandleProps
}

const Order: React.FC<OrderProps> = ({ order, dragHandleProps }) => {
  return (
    <Box float="left" d="flex" m="2" alignItems="center">
      <GrabIcon {...dragHandleProps} p="1" />
      <Box>{order}</Box>
    </Box>
  )
}

export default Order
