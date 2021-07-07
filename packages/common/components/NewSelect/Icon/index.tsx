import React from 'react'

import { CaretDown } from '@psdhub/common/components/Icons'
import { Box } from '@psdhub/common/components'

import { Container } from './styles'

export interface IconProps {
  open: boolean
}

const Icon: React.FC<IconProps> = ({ open }) => {
  return (
    <Container open={open}>
      <Box
        as={CaretDown}
        size={20}
        color="blue.500"
        className="hub-header-icon"
      />
    </Container>
  )
}

export default Icon
