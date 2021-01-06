import React, { useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { BarLoader } from '@hub/common/components'
import Tour from '@hub/common/components/Tour'

import * as Sentry from '@sentry/react'

import Header from '~/components/Header'

import { openTour } from '~/store/modules/tour/actions'
import { postTourViewed } from '~/store/modules/tour/actions'

import { Container } from './styles'

const Dashboard: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: Store.State) => state.global)
  const { user, school } = useSelector((state: Store.State) => state.user)
  const { name } = useSelector((state: Store.State) => state.profile)
  const { level } = useSelector((state: Store.State) => state.levelEducation)

  useEffect(() => {
    // ? Captura de bugs para o Sentry
    if (process.env.REACT_APP_NODE_ENV === 'production') {
      Sentry.setUser({
        username: user?.username as string,
        id: user?.guid as string,
        email: user?.email as string
      })

      Sentry.setContext('user_info', {
        username: user?.username as string,
        email: user?.email as string,
        role: name,
        school: school?.label as string,
        grade_level: level,
        id: user?.guid as string
      })
    }

    window.__HUB_USER_INFO__ = {
      id: user?.guid as string,
      grade_level: level,
      name: user?.name as string,
      role: name,
      school: school?.label as string
    }
  }, [level, name, school?.label, user])

  const { open, steps, viewed } = useSelector(
    (state: Store.State) => state.tour
  )
  const handleClosedTour = useCallback(() => {
    if (viewed) return dispatch(openTour(false))

    dispatch(postTourViewed())
  }, [dispatch, viewed])

  return (
    <Container>
      <BarLoader width="100%" height="4px" loading={loading} />
      {steps?.length && (
        <Tour onClosed={handleClosedTour} open={open} steps={steps || []} />
      )}
      <Header />
      {children}
    </Container>
  )
}

export default Dashboard
