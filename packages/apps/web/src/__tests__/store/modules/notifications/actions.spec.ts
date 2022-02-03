import * as notificationsActions from '~/store/modules/notifications/actions'

describe('Actions of notifications module', () => {
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

  const mockedPutNotificationData = {
    notificationIds: ['test-id-new-message'],
    markAsRead: true
  }

  it('notificationsRequest must have correct action type', () => {
    const mockedType = { type: '@notifications/GET_REQUEST' }

    const resolved = notificationsActions.notificationsRequest()

    expect(resolved).toStrictEqual({ ...mockedType })
  })

  it('notificationsSuccess must have correct action type and payload', () => {
    const mockedType = { type: '@notifications/GET_SUCCESS' }

    const resolved = notificationsActions.notificationsSuccess(mockedHistory)

    expect(resolved).toStrictEqual({ ...mockedType, payload: mockedHistory })
  })

  it('notificationsFailure must have correct action type and payload', () => {
    const mockedType = { type: '@notifications/GET_FAILURE' }

    const resolved = notificationsActions.notificationsFailure()

    expect(resolved).toStrictEqual({ ...mockedType })
  })

  it('notificationPutRequest must have correct action type and payload', () => {
    const mockedType = { type: '@notifications/PUT_REQUEST' }

    const resolved = notificationsActions.notificationPutRequest(
      mockedPutNotificationData
    )

    expect(resolved).toStrictEqual({
      ...mockedType,
      payload: mockedPutNotificationData
    })
  })

  it('notificationPutSuccess must have correct action type and payload', () => {
    const mockedType = { type: '@notifications/PUT_SUCCESS' }

    const resolved = notificationsActions.notificationPutSuccess()

    expect(resolved).toStrictEqual({ ...mockedType })
  })

  it('notificationPutFailure must have correct action type and payload', () => {
    const mockedType = { type: '@notifications/PUT_FAILURE' }

    const resolved = notificationsActions.notificationPutFailure()

    expect(resolved).toStrictEqual({ ...mockedType })
  })
})
