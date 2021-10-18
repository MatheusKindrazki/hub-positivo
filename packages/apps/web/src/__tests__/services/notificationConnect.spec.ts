// import { notificationConnect, disconnect } from '~/services/notificationConnect'

jest.mock('@psdhub/newrelic', () => ({
  ...jest.requireActual('@psdhub/newrelic'),
  noticeError: jest.fn()
}))

jest.mock('@psdhub/common/utils', () => ({
  ...jest.mock('@psdhub/common/utils'),
  createSlug: jest.fn()
}))

jest.mock('@psdhub/api', () => ({
  ...jest.requireActual('@psdhub/api'),
  createHubConnect: jest.fn(),
  stringSubscriptions: jest.fn(() => ({
    HeaderNotification: 'HeaderNotification'
  })),
  HubConnection: jest.fn(() => ({
    off: jest.fn(),
    stop: jest.fn(),
    on: jest.fn()
  }))
}))

jest.mock('ts-debounce', () => ({
  debounce: jest.fn(callback => callback())
}))

describe('notificationConnect should work as expected', () => {
  it('', () => {})
})
