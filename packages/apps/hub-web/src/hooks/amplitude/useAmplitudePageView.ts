import { useEffect } from 'react'

import { useLocation, useHistory } from 'react-router-dom'
import amplitude from 'amplitude-js'

import { store } from '~/store'

import { PageViewed } from './types'

export const useAmplitudePageView = (): void => {
  const { pathname } = useLocation()
  const { signed } = store.getState().auth
  const { school } = store.getState().user
  const { name: role } = store.getState().profile
  const pageViewedEvent = 'Page Viewed'

  useEffect(() => {
    const eventProperties: PageViewed = {
      page_path: pathname,
      page_title: document.title,
      page_url: document.URL,
      user_role: role,
      user_school: school?.label
    }
    if (signed) {
      amplitude.getInstance().logEvent(pageViewedEvent, eventProperties)
    }
  }, [signed, pathname, role, school?.label])
}
