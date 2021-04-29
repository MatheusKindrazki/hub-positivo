import React, { useCallback } from 'react'

import Script from 'react-load-script'

import { useDispatch, useSelector } from 'react-redux'

import { openTour, postTourViewed } from '~/store/modules/tour/actions'

import Tour from '@psdhub/common/components/Tour'
import { BarLoader } from '@psdhub/common/components'

import setUserProperties from '~/services/mixpanel/setProperties'

import ModalNoClass from '~/components/ModalNoClass'
import Header from '~/components/Header'

import { useSendGlobalInfo } from '~/hooks/useSendGlobalInfo'

import { Container } from './styles'

const Dashboard: React.FC = ({ children }) => {
  useSendGlobalInfo()
  setUserProperties()

  const dispatch = useDispatch()

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
      <Script url="//l.getsitecontrol.com/e4zj5ly7.js" />
    </Container>
  )
}

export default Dashboard
