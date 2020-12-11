import React from 'react'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { BarLoader } from '@hub/common/components'

import Header from '~/components/Header'

import { getTourRequest } from '~/store/modules/tour/actions'

import { Container } from './styles'

const Dashboard: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: Store.State) => state.global)

  useEffect(() => {
    dispatch(getTourRequest())
  }, [dispatch])

  return (
    <Container>
      <BarLoader width="100%" height="4px" loading={loading} />
      <Header />
      {children}
    </Container>
  )
}

export default Dashboard
