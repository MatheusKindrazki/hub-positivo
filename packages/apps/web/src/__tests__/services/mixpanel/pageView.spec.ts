import mixpanel from 'mixpanel-browser'

import history from '~/services/history'
import '~/services/mixpanel/pageView'

jest.mock('mixpanel-browser', () => {
  const rest = jest.requireActual('mixpanel-browser')
  return {
    ...rest,
    track: jest
      .fn()
      .mockImplementationOnce(jest.fn())
      .mockImplementationOnce(jest.fn())
      .mockImplementationOnce(() => {
        throw new Error('Erro')
      })
  }
})

describe('testing if mixpanel page viewed functions work properly', () => {
  const pageViewedEvent = 'Page Viewed'

  const instance = mixpanel
  const { track } = instance

  const pageViewedTestUtils = () => {
    const changedHubTitleEvent = (title: string | undefined) =>
      new CustomEvent('@psdhub:title', {
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

  it('MixpanelPageView should dispatch Page Viewed event when application is loaded', async () => {
    jest.useFakeTimers()
    const { loadWindow, documentLocationInfos } = pageViewedTestUtils()
    const title = 'first title'
    document.title = title

    loadWindow()
    await jest.runAllTimers()

    expect(track).toHaveBeenCalledWith(
      pageViewedEvent,
      documentLocationInfos(title)
    )
  })

  it('MixpanelPageView should dispatch Page Viewed event when history href is changed', async () => {
    jest.useFakeTimers()

    const { changeHistory, documentLocationInfos } = pageViewedTestUtils()
    document.title = 'title'
    changeHistory('/login')

    await jest.runAllTimers()

    expect(track).toHaveBeenCalledWith(
      pageViewedEvent,
      documentLocationInfos('title')
    )
  })

  it('MixpanelPageView should early return when current title is at ignore list', async () => {
    jest.useFakeTimers()

    const { changeHistory } = pageViewedTestUtils()
    document.title = 'Carregando Solução'
    changeHistory('/login')

    await jest.runAllTimers()

    expect(track).not.toHaveBeenCalled()
  })

  it('Show an error in the console if MixPanel is not instantiated', async () => {
    jest.useFakeTimers()

    const { changeHistory } = pageViewedTestUtils()

    const mockLog = jest.fn()

    Object.assign(console, {
      error: mockLog
    })

    const title = 'first title'
    document.title = title

    changeHistory('/')
    await jest.runAllTimers()

    expect(mockLog).toBeCalledWith('Erro ao capturar page view no mixpanel')
  })
})
