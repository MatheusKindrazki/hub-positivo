import * as notificationsActions from '~/store/modules/notifications/actions'

describe('Action of global history', () => {
  it('Should call the notificationsRequest action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(notificationsActions, 'notificationsRequest')

    const mockedType = {
      type: '@notifications/GET_REQUEST'
    }

    const resolved = notificationsActions.notificationsRequest()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should call the notificationsSuccess action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(notificationsActions, 'notificationsSuccess')

    const mockedType = {
      type: '@notifications/GET_SUCCESS'
    }

    const mock = [
      {
        origin: 'source',
        message: 'message',
        sentDate: new Date(),
        expirationDate: new Date(),
        id: 'id',
        title: 'titulo',
        url: 'url'
      }
    ]

    const resolved = notificationsActions.notificationsSuccess(mock)

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType, payload: mock })
  })

  it('Should call the notificationsFailure action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(notificationsActions, 'notificationsFailure')

    const mockedType = {
      type: '@notifications/GET_FAILURE'
    }

    const resolved = notificationsActions.notificationsFailure()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should call the notificationPutRequest action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(notificationsActions, 'notificationPutRequest')

    const mockedType = {
      type: '@notifications/PUT_REQUEST',
      payload: {
        notificationIds: ['id'],
        markAsRead: true
      }
    }

    const resolved = notificationsActions.notificationPutRequest({
      markAsRead: true,
      notificationIds: ['id']
    })

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should call the notificationPutSuccess action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(notificationsActions, 'notificationPutSuccess')

    const mockedType = {
      type: '@notifications/PUT_SUCCESS'
    }

    const resolved = notificationsActions.notificationPutSuccess()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should call the notificationPutFailure action correctly and receive the value within payload', () => {
    const spy = jest.spyOn(notificationsActions, 'notificationPutFailure')

    const mockedType = {
      type: '@notifications/PUT_FAILURE'
    }

    const resolved = notificationsActions.notificationPutFailure()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })
})
