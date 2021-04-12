import mixpanel from 'mixpanel-browser'

import history from '~/services/history'

import { PageViewed, CustomEvent } from './types'

const pageViewedEvent = 'Page Viewed'

let oldTitle = document.title

let pathname = '/'

window.onload = function () {
  pathname = document.location.hash.replace('#', '')

  const eventProperties: PageViewed = {
    page_path: pathname,
    page_title: document.title,
    page_url: document.URL
  }

  oldTitle = document.title

  dispatchPage(eventProperties)

  document.addEventListener('@psdhub:title', listenerHubTitle)
}

history.listen(() => {
  document.addEventListener('@psdhub:title', listenerHubTitle)
})

const listenerHubTitle = (custom: CustomEvent) => {
  if (oldTitle === custom?.detail) return

  pathname = document.location.hash.replace('#', '')

  const eventProperties: PageViewed = {
    page_path: pathname,
    page_title: custom?.detail || '',
    page_url: document.URL
  }

  oldTitle = custom?.detail || ''

  dispatchPage(eventProperties)

  document.removeEventListener('@psdhub:title', listenerHubTitle)
}

function dispatchPage(data: PageViewed): void {
  try {
    mixpanel.track(pageViewedEvent, data)
  } catch (error) {
    console.error('Erro ao capturar page view no mixpanel')
  }
}
