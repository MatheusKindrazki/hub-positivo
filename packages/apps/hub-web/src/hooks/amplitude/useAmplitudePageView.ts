import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import amplitude from 'amplitude-js'

import { store } from '~/store'

interface PageViewed {
  page_path: string
  page_title: string
  page_location: string
  page_url: string
  user_educational_stage: string
  user_role: string
  user_school: string | undefined
}

export const useAmplitudePageView = (): void => {
  const { pathname } = useLocation()
  const { school } = store.getState().user
  const { level: educational_stage } = store.getState().educationalStage
  const { name: role } = store.getState().profile
  const pageViewedEvent = 'Page Viewed'

  useEffect(() => {
    const eventProperties: PageViewed = {
      page_path: pathname,
      page_title: document.title,
      page_location: document.location.href,
      page_url: document.URL,
      user_educational_stage: educational_stage,
      user_role: role,
      user_school: school?.value
    }
    amplitude.getInstance().logEvent(pageViewedEvent, eventProperties)
  }, [pageViewedEvent, educational_stage, pathname, role, school?.value])
}
