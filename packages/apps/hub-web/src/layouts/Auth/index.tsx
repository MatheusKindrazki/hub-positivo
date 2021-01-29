import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { BarLoader, CardBox } from '@hub/common/components'

import Logo from '~/components/Logo'

import { Container } from './styles'

const Auth: React.FC = ({ children }) => {
  /* Variáveis para controle do GTM */
  const { loading } = useSelector((state: Store.State) => state.global)

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
      <BarLoader width="100%" height="4px" loading={loading} />
      <Logo />
      <CardBox mt="2.1875rem" maxWidth="25.9375rem">
        {children}
      </CardBox>
    </Container>
  )
}

export default Auth
