import React, { useEffect } from 'react'

import { CardBox } from '@hub/common/components'

import Logo from '~/components/Logo'

import { Container } from './styles'

const Auth: React.FC = ({ children }) => {
  /* Variáveis para controle do GTM */
  useEffect(() => {
    window.__HUB_USER_INFO__ = {
      id: '',
      educational_stage: '',
      name: '',
      role: '',
      school: ''
    }
  }, [])

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
