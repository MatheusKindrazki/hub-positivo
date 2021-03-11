import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import amplitude from 'amplitude-js'

import { store } from '~/store'

import { PageViewed } from './types'

export const useAmplitudePageView = (): void => {
  const { signed } = store.getState().auth
  const { school } = store.getState().user
  const {
    level: educational_stage,
    class: class_name
  } = store.getState().educationalStage
  const { name: role } = store.getState().profile
  const pageViewedEvent = 'Page Viewed'

  useEffect(() => {
    const eventProperties = {
      role,
      school: school?.label,
      educational_stage,
      grade_level: class_name
    }

    console.log(eventProperties)
    if (signed) {
      amplitude.getInstance().logEvent(pageViewedEvent, eventProperties)
    }
  }, [
    pageViewedEvent,
    signed,
    educational_stage,
    role,
    school?.label,
    class_name
  ])
}
