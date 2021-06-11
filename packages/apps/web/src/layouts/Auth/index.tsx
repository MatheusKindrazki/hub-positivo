import React from 'react'

import { useSelector } from 'react-redux'

import Footer from '@psdhub/common/components/Footer'
import { BarLoader, CardBox, Text } from '@psdhub/common/components'

import Logo from '~/components/Logo'

import { Container } from './styles'
import footerData from '../Logged/footerData.json'

const Auth: React.FC = ({ children }) => {
  const { loading } = useSelector((state: Store.State) => state.global)

  return (
    <>
      <Container>
        <BarLoader height="4px" loading={loading} />
        <Logo />
        <CardBox mt="2.1875rem" maxWidth="25.9375rem">
          {children}
        </CardBox>
        <Text mt="4" color="gray.500">
          v{process.env.REACT_APP_VERSION}
        </Text>
      </Container>
      <Footer columns={footerData} />
    </>
  )
}

export default Auth
