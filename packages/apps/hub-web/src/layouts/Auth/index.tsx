import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'

import gsc, { removeGsc } from '@psdhub/gsc'
import { BarLoader, CardBox, Text } from '@psdhub/common/components'

import Logo from '~/components/Logo'

import { Container } from './styles'
const Auth: React.FC = ({ children }) => {
  const { loading } = useSelector((state: Store.State) => state.global)

  useEffect(() => {
    gsc()

    return () => {
      removeGsc()
    }
  }, [])

  return (
    <Container>
      <BarLoader width="100%" height="4px" loading={loading} />
      <Logo />
      <CardBox mt="2.1875rem" maxWidth="25.9375rem">
        {children}
      </CardBox>
      <Text mt="4" color="gray.500">
        v{process.env.REACT_APP_VERSION}
      </Text>
    </Container>
  )
}

export default Auth
