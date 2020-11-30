import React from 'react'

import { useSelector } from 'react-redux'

import { BarLoader } from '@hub/common/components'

import Header from '~/components/Header'

import { Container } from './styles'

const Dashboard: React.FC = ({ children }) => {
  const { loading } = useSelector((state: Store.State) => state.global)

  return (
    <Container>
      <BarLoader width="100%" height="4px" loading={loading} />
      <Header />
      {children}
    </Container>
  )
}

export default Dashboard
