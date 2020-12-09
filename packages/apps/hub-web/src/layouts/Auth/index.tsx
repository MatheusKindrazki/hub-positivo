import React from 'react'

import { CardBox } from '@hub/common/components'

import Logo from '~/components/Logo'

import { Container } from './styles'

const Auth: React.FC = ({ children }) => {
  return (
    <Container>
      <Logo />
      <CardBox mt="2.1875rem" maxWidth="25.9375rem">
        {children}
      </CardBox>
    </Container>
  )
}

export default Auth
