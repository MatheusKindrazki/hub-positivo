import amplitude from 'amplitude-js'

import history from '~/services/history'

import { PageViewed } from './types'

const pageViewedEvent = 'Page Viewed'

window.onload = function () {
  const replacePath = document.location.hash.replace('#', '')

  const eventProperties: PageViewed = {
    page_path: replacePath,
    page_title: document.title,
    page_url: document.URL
  }
  dispatchPage(eventProperties)
}

history.listen(e => {
  const eventProperties: PageViewed = {
    page_path: e.pathname,
    page_title: document.title,
    page_url: document.URL
  }

  dispatchPage(eventProperties)
})

function dispatchPage(data: PageViewed): void {
  amplitude.getInstance().logEvent(pageViewedEvent, data)
}
