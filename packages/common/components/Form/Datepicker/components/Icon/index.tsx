import React from 'react'

import { CalendarBlank } from '@psdhub/common/components/Icons'
import { Box } from '@psdhub/common/components'

import { Container } from './styles'
const Icon: React.FC = () => {
  return (
    <Container role="button">
      <Box
        as={CalendarBlank}
        size={20}
        color="blue.500"
        className="hub-header-icon"
      />
    </Container>
  )
}

export default Icon
