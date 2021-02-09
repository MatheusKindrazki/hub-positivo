import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import amplitude from 'amplitude-js'

import { useSelector } from 'react-redux'

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

  const { school } = useSelector((state: Store.State) => state.user)
  const { level: educational_stage } = useSelector(
    (state: Store.State) => state.levelEducation
  )
  const { name: role } = useSelector((state: Store.State) => state.profile)

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
    console.log('eventProps', eventProperties)
    amplitude.getInstance().logEvent(pageViewedEvent, eventProperties)
  }, [pageViewedEvent, educational_stage, pathname, role, school?.value])
}
