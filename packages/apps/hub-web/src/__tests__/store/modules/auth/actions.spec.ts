import * as authActions from '~/store/modules/auth/actions'

describe('Actions auth store', () => {
  it('hope the preparingUserData calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(authActions, 'preparingUserData')

    const mockedPayload = {
      selected_school: {
        id: 'fake-guid-id',
        user_id: undefined,
        integration_id: undefined,
        time_zone: undefined,
        name: 'Positivo Soluções',
        roles: ['Admin', 'Prof'],
        label: 'PSD',
        value: 'psd'
      },
      selected_profile: {
        id: 'fake-guid-id',
        name: 'Administrator',
        icon: 'admin',
        colorProfile: 'green'
      },
      profiles: [
        {
          id: 'fake-guid-id',
          name: 'Administrator',
          icon: 'admin',
          colorProfile: 'green'
        }
      ],
      redirect: undefined
    }

    const mockedType = {
      type: '@auth/FIRST_ACCESS'
    }

    const resolved = authActions.preparingUserData(mockedPayload)

    expect(spy).toBeCalledWith(mockedPayload)

    expect(resolved).toEqual({ ...mockedType, payload: mockedPayload })
  })

  it('hope the signInRequest calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(authActions, 'signInRequest')

    const mockedPayload = {
      username: 'john-doe',
      password: '123456',
      redirect: undefined
    }

    const mockedType = {
      type: '@auth/SIGN_IN_REQUEST'
    }

    const resolved = authActions.signInRequest(mockedPayload)

    expect(spy).toBeCalledWith(mockedPayload)

    expect(resolved).toEqual({ ...mockedType, payload: mockedPayload })
  })

  it('hope the signInSuccess calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(authActions, 'signInSuccess')

    const mockedPayload = {
      token: 'mocked-token',
      refresh_token: 'mocked-refresh-token',
      exp: 10,
      user: {
        name: 'John Doe',
        integration_id: null,
        id: 'fake-id',
        guid: 'uuid',
        username: 'john-doe',
        schools: undefined,
        email: 'john@doe.com'
      }
    }

    const mockedType = {
      type: '@auth/SIGN_IN_SUCCESS'
    }

    const resolved = authActions.signInSuccess(mockedPayload)

    expect(spy).toBeCalledWith(mockedPayload)

    expect(resolved).toEqual({ ...mockedType, payload: mockedPayload })
  })

  it('hope the refreshTokenSuccess calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(authActions, 'refreshTokenSuccess')

    const mockedPayload = {
      token: 'my-token',
      refresh_token: 'my-refresh-token',
      exp: 999
    }

    const mockedType = {
      type: '@auth/REFRESH_TOKEN_SUCCESS'
    }

    const resolved = authActions.refreshTokenSuccess(mockedPayload)

    expect(spy).toBeCalledWith(mockedPayload)

    expect(resolved).toEqual({ ...mockedType, payload: mockedPayload })
  })

  it('hope the reducedTokenEEM calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(authActions, 'reducedTokenEEM')

    const mockedPayload = 'string-token'

    const mockedType = {
      type: '@auth/REDUCED_TOKEN_EEM'
    }

    const resolved = authActions.reducedTokenEEM(mockedPayload)

    expect(spy).toBeCalledWith(mockedPayload)

    expect(resolved).toEqual({ ...mockedType, payload: mockedPayload })
  })

  it('hope signOut is called', () => {
    const spy = jest.spyOn(authActions, 'signOut')

    const mockedType = {
      type: '@auth/SIGN_OUT'
    }

    const resolved = authActions.signOut()

    expect(spy).toBeCalled()

    expect(resolved).toEqual(mockedType)
  })

  it('hope refreshTokenRequest is called', () => {
    const spy = jest.spyOn(authActions, 'refreshTokenRequest')

    const mockedType = {
      type: '@auth/REFRESH_TOKEN_REQUEST'
    }

    const resolved = authActions.refreshTokenRequest()

    expect(spy).toBeCalled()

    expect(resolved).toEqual(mockedType)
  })

  it('hope signInRequestLoading is called', () => {
    const spy = jest.spyOn(authActions, 'signInRequestLoading')

    const mockedType = {
      type: '@auth/SIGN_IN_REQUEST_LOADING'
    }

    const resolved = authActions.signInRequestLoading()

    expect(spy).toBeCalled()

    expect(resolved).toEqual(mockedType)
  })

  it('hope signInFailure is called', () => {
    const spy = jest.spyOn(authActions, 'signInFailure')

    const mockedType = {
      type: '@auth/SIGN_IN_FAILURE'
    }

    const resolved = authActions.signInFailure()

    expect(spy).toBeCalled()

    expect(resolved).toEqual(mockedType)
  })

  it('hope withoutAccess is called', () => {
    const spy = jest.spyOn(authActions, 'withoutAccess')

    const mockedType = {
      type: '@auth/WITHOUT_ACCESS'
    }

    const resolved = authActions.withoutAccess()

    expect(spy).toBeCalled()

    expect(resolved).toEqual(mockedType)
  })

  it('hope setSigned is called', () => {
    const spy = jest.spyOn(authActions, 'setSigned')

    const mockedType = {
      type: '@auth/SET_SIGNED'
    }

    const resolved = authActions.setSigned()

    expect(spy).toBeCalled()

    expect(resolved).toEqual(mockedType)
  })
})
