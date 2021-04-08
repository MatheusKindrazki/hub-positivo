import mixpanel from 'mixpanel-browser'

import history from '~/services/history'
import '~/services/mixpanel/pageView'

jest.mock('mixpanel-browser', () => ({
  track: jest.fn()
}))

describe('testing if mixpanel page viewed functions work properly', () => {
  const pageViewedEvent = 'Page Viewed'

  const instance = mixpanel
  const { track } = instance

  const pageViewedTestUtils = () => {
    const changedHubTitleEvent = (title: string | undefined) =>
      new CustomEvent('@hub:title', {
        detail: title
      })

    const onLoadEvent = new Event('load')

    const loadWindow = () => window.dispatchEvent(onLoadEvent)

    const changeHistory = (path: string) => history.push(path)

    const documentLocationInfos = (title: string) => ({
      page_path: document.location.hash.replace('#', ''),
      page_title: title,
      page_url: document.URL
    })

    return {
      changedHubTitleEvent,
      onLoadEvent,
      dispatchEvent,
      loadWindow,
      changeHistory,
      documentLocationInfos
    }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('MixpanelPageView should dispatch Page Viewed event when application is loaded', () => {
    const {
      changedHubTitleEvent,
      loadWindow,
      documentLocationInfos
    } = pageViewedTestUtils()
    loadWindow()

    const title = 'first title'

    document.dispatchEvent(changedHubTitleEvent(title))

    expect(track).toHaveBeenCalledWith(
      pageViewedEvent,
      documentLocationInfos(title)
    )
  })

  it('MixpanelPageView should dispatch Page Viewed event when history href is changed', () => {
    const {
      changedHubTitleEvent,
      changeHistory,
      documentLocationInfos,
      loadWindow
    } = pageViewedTestUtils()
    loadWindow()

    changeHistory('/login')

    document.dispatchEvent(changedHubTitleEvent(undefined))

    expect(track).toHaveBeenCalledWith(
      pageViewedEvent,
      documentLocationInfos('')
    )
  })

  it('Show an error in the console if MixPanel is not instantiated', () => {
    const { changedHubTitleEvent, loadWindow } = pageViewedTestUtils()

    const mockLog = jest.fn()

    Object.assign(console, {
      error: mockLog
    })

    jest.spyOn(mixpanel, 'track').mockImplementation(() => {
      throw new Error('Erro')
    })

    loadWindow()

    const title = 'first title'

    document.dispatchEvent(changedHubTitleEvent(title))

    expect(mockLog).toBeCalledWith('Erro ao capturar page view no mixpanel')
  })
})