import mixpanel from 'mixpanel-browser'

import delay from '@hub/common/utils/delay'

import history from '~/services/history'

import { PageViewed } from './types'

let lastPath = ''

const pageViewedEvent = 'Page Viewed'

const firstTitle = document.title

const ignoreTitle = ['Carregando Solução', firstTitle]

window.addEventListener('load', () => listenerHubTitle())

history.listen(() => {
  listenerHubTitle()
})

const listenerHubTitle = async () => {
  await delay(1000)

  const arrayTitle = document.title.split(' - ')[0]

  if (document.title === firstTitle || ignoreTitle.includes(arrayTitle)) {
    listenerHubTitle()

    return
  }

  const pathname = document.location.hash.replace('#', '')

  const eventProperties: PageViewed = {
    page_path: pathname,
    page_title: document.title || '',
    page_url: document.URL
  }

  if (lastPath === pathname) return

  lastPath = pathname

  dispatchPage(eventProperties)
}

function dispatchPage(data: PageViewed): void {
  try {
    mixpanel.track(pageViewedEvent, data)
  } catch (error) {
    console.error('Erro ao capturar page view no mixpanel')
  }
}
