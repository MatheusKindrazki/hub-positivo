import React, { useCallback, useEffect } from 'react'

import { debounce } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'

import { openTour, postTourViewed } from '~/store/modules/tour/actions'

import Tour from '@psdhub/common/components/Tour'
import { BarLoader } from '@psdhub/common/components'
import { initChatbot } from '@psdhub/chatbot'

import setUserProperties from '~/services/mixpanel/setProperties'
import history from '~/services/history'

import ModalNoClass from '~/components/ModalNoClass'
import ModalAlternativeAccess from '~/components/ModalAlternativeAccess'
import ModalAcceptTerms from '~/components/ModalAcceptTerms'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

import { Container } from './styles'
import footerData from './footerData.json'

const dispatchEvent = debounce(() => setUserProperties(), 1000)

const Dashboard: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => dispatchEvent())

  const { loading } = useSelector((state: Store.State) => state.global)
  const { nobreak } = useSelector((state: Store.State) => state.noBreakAccess)

  const { school } = useSelector((state: Store.State) => state.user)

  const { open, steps, viewed } = useSelector(
    (state: Store.State) => state.tour
  )
  const handleGoBack = useCallback(async () => {
    setTimeout(() => history.push('/'), 500)
  }, [])

  const handleClosedTour = useCallback(() => {
    if (viewed) return dispatch(openTour(false))

    dispatch(postTourViewed())
  }, [dispatch, viewed])

  return (
    <Container>
      <ModalNoClass />
      <ModalAcceptTerms />
      <BarLoader height="4px" loading={loading} />
      {steps?.length && (
        <Tour onClosed={handleClosedTour} open={open} steps={steps} />
      )}
      <Header
        handleGoBack={handleGoBack}
        schoolName={school?.label as string}
      />
      <main className="hub-main-class">
        {nobreak && <ModalAlternativeAccess />}
        {children}
      </main>
      <Footer columns={footerData} />
    </Container>
  )
}

export default Dashboard
