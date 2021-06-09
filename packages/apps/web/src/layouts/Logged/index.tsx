import React, { useCallback, useEffect } from 'react'

import { debounce } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'

import { openTour, postTourViewed } from '~/store/modules/tour/actions'

import Tour from '@psdhub/common/components/Tour'
import Footer from '@psdhub/common/components/Footer'
import { BarLoader } from '@psdhub/common/components'

import setUserProperties from '~/services/mixpanel/setProperties'

import ModalNoClass from '~/components/ModalNoClass'
import Header from '~/components/Header'

import { Container } from './styles'
import FooterData from './footerData.json'

const dispatchEvent = debounce(() => setUserProperties(), 1000)

const Dashboard: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => dispatchEvent())

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
      <BarLoader height="4px" loading={loading} />
      {steps?.length && (
        <Tour onClosed={handleClosedTour} open={open} steps={steps} />
      )}
      <Header />
      {children}
      <Footer columns={FooterData} />
    </Container>
  )
}

export default Dashboard
