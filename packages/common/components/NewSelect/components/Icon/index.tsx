import React from 'react'

import { CaretDown } from '@psdhub/common/components/Icons'
import { Box } from '@psdhub/common/components'

import { Container } from './styles'

export interface IconProps {
  open: boolean
  onClick(): void
}

const Icon: React.FC<IconProps> = ({ open, onClick }) => {
  return (
    <Container role="button" open={open} onClick={onClick}>
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
