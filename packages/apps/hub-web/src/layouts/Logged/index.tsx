import React, { useCallback, useEffect } from 'react'

import Script from 'react-load-script'
import { generate } from 'randomstring'

import { useDispatch, useSelector } from 'react-redux'

import { openTour, postTourViewed } from '~/store/modules/tour/actions'

import gsc, { removeGsc } from '@psdhub/gsc'
import Tour from '@psdhub/common/components/Tour'
import { BarLoader } from '@psdhub/common/components'

import setUserProperties from '~/services/mixpanel/setProperties'

import ModalNoClass from '~/components/ModalNoClass'
import Header from '~/components/Header'

import { Container } from './styles'

window.gsc = undefined

const Dashboard: React.FC = ({ children }) => {
  gsc()
  setUserProperties()

  const dispatch = useDispatch()
  useEffect(() => {
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
      <Script url={`//l.getsitecontrol.com/e4zj5ly7.js?hash=${generate(10)}`} />
    </Container>
  )
}

export default Dashboard
