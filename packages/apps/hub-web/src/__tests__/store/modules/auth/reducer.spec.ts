import AuthReducer from '~/store/modules/auth/reducer'
import * as authActions from '~/store/modules/auth/actions'

const mockedSignIn = {
  exp: 0,
  token: null,
  signed: false,
  loading: false,
  refresh_token: null,
  reduced_token: null,
  signInStrike: false,
  withoutAccess: false
}

describe('Reducer of authentication history', () => {
  it('hope at the shooting of Action Reducers steps are triggered by setting the default information', () => {
    const action = authActions.signInRequest({
      password: '1234',
      redirect: undefined,
      username: 'john-doe'
    })

    const state = AuthReducer(mockedSignIn, action)

    expect(state.signed).toEqual(false)
    expect(state.signInStrike).toEqual(false)
    expect(state.withoutAccess).toEqual(false)
  })

  it('hope that in login failure, the information returns to the initial state', () => {
    const action = authActions.signInFailure()

    const state = AuthReducer(mockedSignIn, action)

    expect(state).toEqual({ ...mockedSignIn, signInStrike: true })
  })

  it('hope that in the success of the login, the token is received beyond the other infos for access to the platform', () => {
    const mockedUser = {
      name: 'John Doe',
      integration_id: null,
      id: 'fake-id',
      guid: 'uuid',
      username: 'john-doe',
      schools: undefined,
      email: 'john@doe.com'
    }

    const action = authActions.signInSuccess({
      token: 'mocked-token',
      refresh_token: 'mocked-refresh-token',
      exp: 10,
      user: mockedUser
    })

    const state = AuthReducer(mockedSignIn, action)

    expect(state.token).toEqual('mocked-token')
    expect(state.refresh_token).toEqual('mocked-refresh-token')
  })

  it('hope the loading is fired while the check action happens', () => {
    const action = authActions.signInRequestLoading()

    const state = AuthReducer(mockedSignIn, action)

    expect(state.loading).toBeTruthy()
  })

  it('hope that in the absence of an initial status defined, the default state is triggered', () => {
    const action = authActions.signInRequestLoading()

    const state = AuthReducer(undefined, action)

    expect(state.loading).toBeTruthy()
  })

  it('hope that being true all login treatives, the user is released for access to the system', () => {
    const action = authActions.setSigned()

    const state = AuthReducer(undefined, action)

    expect(state.signed).toBeTruthy()
    expect(state.withoutAccess).not.toBeTruthy()
  })

  it('hope that in the absence of education level, the user is blocked for access to platform', () => {
    const action = authActions.withoutAccess()

    const state = AuthReducer(undefined, action)

    expect(state.withoutAccess).toBeTruthy()
  })

  it('hope the reduced token is received and past for storage', () => {
    const action = authActions.reducedTokenEEM('my-reduced-token')

    const state = AuthReducer(undefined, action)

    expect(state.reduced_token).toBe('my-reduced-token')
  })

  it('hope in the success generation of a new token, a refresh token and an expiration date is received', () => {
    const mocked = {
      exp: 99,
      refresh_token: 'my-refresh-token',
      token: 'my-token'
    }

    const action = authActions.refreshTokenSuccess(mocked)

    const state = AuthReducer(undefined, action)

    expect(state.refresh_token).toBe('my-refresh-token')
    expect(state.token).toBe('my-token')
    expect(state.exp).toBe(99)
  })

  it("hope that in the user's exit, all states are resetted", () => {
    const action = authActions.signOut()

    const state = AuthReducer(undefined, action)

    expect(state).toEqual(mockedSignIn)
  })

  it('hope if an unexpected exception is received, the same will have no effect on the application states', () => {
    const state = AuthReducer(undefined, { type: 'non-expected-action' })

    expect(state).toEqual(mockedSignIn)
  })
})
