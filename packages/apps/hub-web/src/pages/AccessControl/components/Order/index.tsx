import React from 'react'

import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

import { Stack, Box } from '@psdhub/common/components'

import GrabIcon from '~/components/GrabIcon'

interface OrderProps {
  order: number
  dragHandleProps?: DraggableProvidedDragHandleProps
}

const Order: React.FC<OrderProps> = ({ order, dragHandleProps }) => {
  return (
    <Stack direction="row" alignItems="center">
      <GrabIcon {...dragHandleProps} p="1" />
      <Box w="7">{order}</Box>
    </Stack>
  )
}

export default Order
