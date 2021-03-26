import { renderHook } from '@testing-library/react-hooks'

import * as utils from '~/utils/hasJsonStructure'

import usePostMessage from '~/middlewares/postMessage'

interface Data {
  event: string
  data: string
}

interface CustomMessageEvent extends Event {
  data?: string | Data
}

const mockedPush = jest.fn()

const mockedPathname = 'test/mock/path/'

const mockedParams = 'fake-parameter'

jest.mock('mixpanel-browser')

jest.mock('react-router-dom', () => {
  const ui = jest.requireActual('react-router-dom')
  return {
    ...ui,
    useLocation: jest
      .fn(() => ({
        pathname: mockedPathname
      }))
      .mockImplementationOnce(() => ({
        pathname: 'test/mock/path/fake-parameter/'
      })),
    useParams: () => ({
      solution: mockedParams
    }),
    useHistory: () => ({
      push: mockedPush
    })
  }
})

describe('postMessage should work properly', () => {
  afterEach(jest.clearAllMocks)

  it('shouldnt redirect when mounted URL is equal current pathname', async () => {
    const event = new CustomEvent('message') as CustomMessageEvent

    const dataObject = {
      event: 'history-change',
      data: 'http://teste.com'
    }

    renderHook(() => usePostMessage())

    event.data = JSON.stringify(dataObject)

    window.dispatchEvent(event)

    expect(mockedPush).not.toHaveBeenCalled()
  })

  it('should call push on history-change event', async () => {
    renderHook(() => usePostMessage())

    const event = new CustomEvent('message') as CustomMessageEvent

    const dataObject = {
      event: 'history-change',
      data: 'http://teste.com'
    }

    event.data = JSON.stringify(dataObject)

    window.dispatchEvent(event)

    expect(mockedPush).toHaveBeenCalledWith(mockedPathname + mockedParams + '/')
  })

  it('shouldnt redirect when receives non stringfied data', async () => {
    renderHook(() => usePostMessage())

    const event = new CustomEvent('message') as CustomMessageEvent

    const dataObject = {
      event: 'history-change',
      data: 'http://teste.com'
    }

    event.data = dataObject

    window.dispatchEvent(event)

    expect(mockedPush).not.toHaveBeenCalled()
  })

  it('shouldnt redirect when data hasnt json structure', async () => {
    renderHook(() => usePostMessage())

    const event = new CustomEvent('message') as CustomMessageEvent

    const dataObject = null

    event.data = JSON.stringify(dataObject)

    window.dispatchEvent(event)

    expect(mockedPush).not.toHaveBeenCalled()
  })

  it('shouldnt redirect when event type isnt history-change', async () => {
    renderHook(() => usePostMessage())

    const event = new CustomEvent('message') as CustomMessageEvent

    const dataObject = {
      event: 'not-history-change',
      data: 'http://teste.com'
    }

    event.data = JSON.stringify(dataObject)

    window.dispatchEvent(event)

    expect(mockedPush).not.toHaveBeenCalled()
  })

  it('shouldnt redirect when data isnt parseable', async () => {
    const unparseableData = JSON.stringify([{ teste: { teste: 'teste' } }])

    jest.spyOn(utils, 'hasJsonStructure').mockReturnValue(true)

    jest.spyOn(JSON, 'parse').mockImplementation(data => {
      if (data === unparseableData) {
        return false
      }
      return JSON.parse(data)
    })

    renderHook(() => usePostMessage())

    const event = new CustomEvent('message') as CustomMessageEvent

    event.data = unparseableData

    window.dispatchEvent(event)

    expect(mockedPush).not.toHaveBeenCalled()
  })
})
