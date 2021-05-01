import React, { useCallback, useEffect } from 'react'

import { debounce } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'

import { postTourViewed, openTour } from '~/store/modules/tour/actions'

import gsc, { removeGsc } from '@hub/gsc'
import Tour from '@hub/common/components/Tour'
import { BarLoader } from '@hub/common/components'

import setUserProperties from '~/services/mixpanel/setProperties'

import ModalNoClass from '~/components/ModalNoClass'
import Header from '~/components/Header'

import { Container } from './styles'

const dispatchEvent = debounce(() => setUserProperties(), 1500)

const Dashboard: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => dispatchEvent())

  useEffect(() => {
    gsc()

    return () => {
      removeGsc()
    }
  }, [])

  const { loading } = useSelector((state: Store.State) => state.global)

  const { open, steps, viewed } = useSelector(
    (state: Store.State) => state.tour
  )

  const handleClosedTour = useCallback(() => {
    if (viewed) return dispatch(openTour(false))

    dispatch(postTourViewed())
  }, [dispatch, viewed])

  return (
    <Container>
      <ModalNoClass />
      <BarLoader width="100%" height="4px" loading={loading} />
      {steps?.length && (
        <Tour onClosed={handleClosedTour} open={open} steps={steps} />
      )}
      <Header />
      {children}
    </Container>
  )
}

export default Dashboard
