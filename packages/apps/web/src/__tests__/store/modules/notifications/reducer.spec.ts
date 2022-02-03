import notifications, {
  INITIAL_STATE
} from '~/store/modules/notifications/reducer'
import {
  notificationsRequest,
  notificationsSuccess,
  notificationsFailure
} from '~/store/modules/notifications/actions'

describe('Notifications reducer', () => {
  const mockedHistory = [
    {
      id: 'test-id-new-message',
      title: 'Test Title for new message',
      url: 'http://test.com',
      message: 'Test new message.',
      origin: 'mocked test',
      sentDate: new Date(),
      new: true,
      expirationDate: new Date()
    },
    {
      id: 'test-id-seen-message',
      title: 'Test Title for seen message',
      url: 'http://test.com',
      message: 'Test seen message.',
      origin: 'mocked test',
      sentDate: new Date(),
      new: false,
      expirationDate: new Date()
    }
  ]

  it('returns the initial state when an action type is not passed', () => {
    const result = notifications(undefined, { type: null })
    expect(result).toEqual(INITIAL_STATE)
  })

  it('should change loading to true  when notifications are requested', () => {
    expect(notifications(INITIAL_STATE, notificationsRequest())).toEqual({
      loading: true,
      history: undefined
    })
  })

  it('should change loading to false and store data when notification history is received', () => {
    expect(
      notifications(INITIAL_STATE, notificationsSuccess(mockedHistory))
    ).toEqual({
      loading: false,
      history: mockedHistory
    })
  })

  it('loading is set to false and data reseted on failure action', () => {
    expect(notifications(INITIAL_STATE, notificationsFailure())).toEqual({
      loading: false,
      history: undefined
    })
  })
})
