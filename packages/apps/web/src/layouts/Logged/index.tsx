import React, { useCallback, useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import { debounce } from 'lodash'
import { instanceNPS, ModalNPS } from '@psdlabs/nps'

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

import useNotifications from '~/hooks/useNotifications'

import { Container } from './styles'
import footerData from './footerData.json'

const dispatchEvent = debounce(() => setUserProperties(), 1000)

const Dashboard: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => dispatchEvent())

  const toggleNotifications = Number(
    process.env.REACT_APP_FEATURE_NOTIFICATIONS
  )

  const { info } = useSelector((state: Store.State) => state.user)
  const { reduced_token } = useSelector((state: Store.State) => state.auth)
  const notifications = useNotifications(toggleNotifications)
  const { loading } = useSelector((state: Store.State) => state.global)
  const { nobreak } = useSelector((state: Store.State) => state.noBreakAccess)

  const { school } = useSelector((state: Store.State) => state.user)

  const { guid } = useSelector((state: Store.State) => state.profile)
  const { level } = useSelector((state: Store.State) => state.educationalStage)

  initChatbot({ profile: guid })

  instanceNPS(reduced_token as string, {
    idEscola: school?.value || '',
    nomeEscola: school?.label || '',
    nomeUsuario: info?.name || '',
    perfil: guid as any,
    segmento: level || ('EM' as any)
  })

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
      <ModalNPS appName="SPE" />

      <ModalNoClass />
      <ModalAcceptTerms />
      <BarLoader height="4px" loading={loading} />
      {steps?.length && (
        <Tour onClosed={handleClosedTour} open={open} steps={steps} />
      )}
      <Header
        notifications={notifications}
        handleGoBack={handleGoBack}
        schoolName={school?.label as string}
      />
      <main className="hub-main-class">
        {nobreak && <ModalAlternativeAccess />}
        {children}
      </main>
      {location.pathname === '/' && <Footer columns={footerData} />}
    </Container>
  )
}

export default Dashboard
