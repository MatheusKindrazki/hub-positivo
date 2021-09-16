import React, { useCallback, useEffect } from 'react'

import { debounce } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'

import { openTour, postTourViewed } from '~/store/modules/tour/actions'
import { setEducationalStage } from '~/store/modules/educationalStage/actions'
import { signOut } from '~/store/modules/auth/actions'

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
  const { guid } = useSelector((state: Store.State) => state.profile)
  initChatbot({
    school: school?.value as string,
    profile: guid
  })
 
  const { profile } = useSelector((state: Store.State) => state.profile)
  const { levels, level } = useSelector(
    (state: Store.State) => state.educationalStage
  )
  const { open, steps, viewed } = useSelector(
    (state: Store.State) => state.tour
  )

  const handleSetEducationalStage = useCallback(
    stage => {
      dispatch(setEducationalStage(stage))
    },
    [dispatch]
  )

  const handleSignOut = useCallback(async () => {
    dispatch(signOut())
    setTimeout(() => history.push('/login'), 500)
  }, [dispatch])

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
        handleEducationalStageSwitch={handleSetEducationalStage}
        selectedLevel={level}
        handleSignOut={handleSignOut}
        schoolName={school?.label as string}
        educationalLevels={
          profile === 'professor'
            ? levels?.map(level => level.label)
            : undefined
        }
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
