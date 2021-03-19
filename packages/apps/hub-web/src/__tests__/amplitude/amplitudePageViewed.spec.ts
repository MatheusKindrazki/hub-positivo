import amplitude from 'amplitude-js'

import history from '~/services/history'
import '~/hooks/amplitude/amplitudePageView'

jest.mock('amplitude-js', () => ({
  getInstance: jest.fn().mockReturnValue({
    logEvent: jest.fn()
  })
}))

describe('testing amplitude functions', () => {
  const pageViewedEvent = 'Page Viewed'

  const instance = amplitude.getInstance()
  const { logEvent } = instance

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

  it('AmplitudePageView should dispatch Page Viewd event when aplication is loaded', () => {
    const {
      changedHubTitleEvent,
      loadWindow,
      documentLocationInfos
    } = pageViewedTestUtils()
    loadWindow()

    const title = 'first title'

    document.dispatchEvent(changedHubTitleEvent(title))

    expect(logEvent).toHaveBeenCalledWith(
      pageViewedEvent,
      documentLocationInfos(title)
    )
  })

  it('AmplitudePageView should dispatch Page Viewd event when history href is changed', () => {
    const {
      changedHubTitleEvent,
      changeHistory,
      documentLocationInfos,
      loadWindow
    } = pageViewedTestUtils()
    loadWindow()

    changeHistory('/login')

    document.dispatchEvent(changedHubTitleEvent(undefined))

    expect(logEvent).toHaveBeenCalledWith(
      pageViewedEvent,
      documentLocationInfos('')
    )
  })

  it('AmplitudePageView should not dispatch a Page Viewd event when oldTitle is the same that current title', () => {
    const { changedHubTitleEvent, loadWindow } = pageViewedTestUtils()
    loadWindow()

    const oldTitle = ''
    document.dispatchEvent(changedHubTitleEvent(oldTitle))

    expect(logEvent).not.toHaveBeenCalled()
  })
})
