import * as userActions from '~/store/modules/user/actions'

describe('Action of user history', () => {
  it('Should shoot the action of UserRequest', () => {
    const spy = jest.spyOn(userActions, 'userRequest')

    const mockedType = {
      type: '@user/USER_REQUEST'
    }

    const resolved = userActions.userRequest()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should shoot the action of UserSuccess', () => {
    const spy = jest.spyOn(userActions, 'userSuccess')

    const mockedType = {
      type: '@user/USER_SUCCESS'
    }

    const resolved = userActions.userSuccess()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should shoot the action of UserFailure', () => {
    const spy = jest.spyOn(userActions, 'userFailure')

    const mockedType = {
      type: '@user/USER_FAILURE'
    }

    const resolved = userActions.userFailure()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should shoot setSchool action with payload containing the infos', () => {
    const spy = jest.spyOn(userActions, 'setSchool')

    const mockedType = {
      type: '@user/SET_SCHOOL'
    }

    const payload = {
      id: '123',
      name: 'PSD',
      roles: ['Admin']
    }

    const resolved = userActions.setSchool(payload)

    expect(spy).toBeCalledWith(payload)

    expect(resolved).toEqual({ ...mockedType, payload: payload })
  })

  it('Should shoot forgotPasswordRequest action with payload containing the infos', () => {
    const spy = jest.spyOn(userActions, 'forgotPasswordRequest')

    const mockedType = {
      type: '@user/USER_PASSWORD_REQUEST'
    }

    const payload = {
      newPassword: 'my-new-pass',
      pin: '123'
    }

    const resolved = userActions.forgotPasswordRequest(payload)

    expect(spy).toBeCalledWith(payload)

    expect(resolved).toEqual({ ...mockedType, payload: payload })
  })

  it('Should shoot the action of forgotPasswordSuccess', () => {
    const spy = jest.spyOn(userActions, 'forgotPasswordSuccess')

    const mockedType = {
      type: '@user/USER_PASSWORD_SUCCESS'
    }

    const resolved = userActions.forgotPasswordSuccess()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should shoot the action of forgotPasswordFailure', () => {
    const spy = jest.spyOn(userActions, 'forgotPasswordFailure')

    const mockedType = {
      type: '@user/USER_PASSWORD_FAILURE'
    }

    const resolved = userActions.forgotPasswordFailure()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })
  it('Should shoot alterPasswordRequest action with payload containing the infos', () => {
    const spy = jest.spyOn(userActions, 'alterPasswordRequest')

    const mockedType = {
      type: '@user/USER_PASSWORD_PANEL_REQUEST'
    }

    const payload = {
      newPassword: '1234',
      oldPassword: '123'
    }

    const resolved = userActions.alterPasswordRequest(payload)

    expect(spy).toBeCalledWith(payload)

    expect(resolved).toEqual({ ...mockedType, payload: payload })
  })

  it('Should shoot the action of alterPasswordSuccess', () => {
    const spy = jest.spyOn(userActions, 'alterPasswordSuccess')

    const mockedType = {
      type: '@user/USER_PASSWORD_PANEL_SUCCESS'
    }

    const resolved = userActions.alterPasswordSuccess()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should shoot the action of alterPasswordFailure', () => {
    const spy = jest.spyOn(userActions, 'alterPasswordFailure')

    const mockedType = {
      type: '@user/USER_PASSWORD_PANEL_FAILURE'
    }

    const resolved = userActions.alterPasswordFailure()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })
})
