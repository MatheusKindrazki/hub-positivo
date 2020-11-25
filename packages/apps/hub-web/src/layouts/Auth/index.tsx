import React from 'react'

import Logo from '@hub/common/components/Logo'

import { Box } from '@chakra-ui/react'

import { Container } from './styles'

const Auth: React.FC = ({ children }) => {
  return (
    <Container>
      <Logo />
      <Box
        background="white"
        width="100%"
        maxWidth="415px"
        borderWidth="1px"
        rounded="md"
        shadow="md"
      >
        {children}
      </Box>
    </Container>
  )
}

export default Auth
