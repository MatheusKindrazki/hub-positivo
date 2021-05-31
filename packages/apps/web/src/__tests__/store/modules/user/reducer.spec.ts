import UserReducer, { INITIAL_STATE } from '~/store/modules/user/reducer'
import * as userActions from '~/store/modules/user/actions'

describe('Reducer of user history', () => {
  it('Should Set Loading How True On The Action Shooting of AlterPasswordRequest', () => {
    const action = userActions.alterPasswordRequest({
      newPassword: '1234',
      oldPassword: '123'
    })

    const state = UserReducer(INITIAL_STATE, action)

    expect(state.loading).toBeTruthy()
  })

  it('Should Set Loading How false On The Action Shooting of alterPasswordSuccess', () => {
    const action = userActions.alterPasswordSuccess()

    const state = UserReducer(INITIAL_STATE, action)

    expect(state.loading).not.toBeTruthy()
  })

  it('Should Set Loading How false On The Action Shooting of alterPasswordFailure', () => {
    const action = userActions.alterPasswordFailure()

    const state = UserReducer(INITIAL_STATE, action)

    expect(state.loading).not.toBeTruthy()
  })

  it('Should reset the information in the user logout', () => {
    const manipulatedState = {
      ...INITIAL_STATE,
      school: {
        value: 'FAKE SCHOOL',
        label: 'FAKE SCHOOL',
        user_id: 'FAKE_USER_ID',
        integration_id: undefined,
        roles: ['admin']
      }
    }

    const state = UserReducer(manipulatedState, { type: '@auth/SIGN_OUT' })

    expect(state).not.toEqual(manipulatedState)
  })

  it('Should Set Loading How false On The Action Shooting of alterPasswordSuccess', () => {
    const action = userActions.forgotPasswordRequest({
      newPassword: '123',
      pin: '1234'
    })

    const state = UserReducer(undefined, action)

    expect(state.loading).toBe(true)
  })

  it('Should Set Loading How false On The Action Shooting of forgotPasswordSuccess', () => {
    const action = userActions.forgotPasswordSuccess()

    const state = UserReducer(undefined, action)

    expect(state.loading).toBe(false)
  })

  it('Should Set Loading How false On The Action Shooting of forgotPasswordFailure', () => {
    const action = userActions.forgotPasswordFailure()

    const state = UserReducer(undefined, action)

    expect(state.loading).toBe(false)
  })

  it('Should set the state with the selected school', () => {
    const action = userActions.setSchool({
      id: '123',
      name: 'FAKE_SCHOOL',
      roles: ['fake-role']
    })

    const state = UserReducer(undefined, action)

    expect(state.school).toEqual({
      id: '123',
      name: 'FAKE_SCHOOL',
      roles: ['fake-role']
    })
  })

  it('Should set all user information in the initial state', () => {
    const info = {
      name: 'John Doe'
    }

    const state = UserReducer(undefined, {
      type: '@auth/SIGN_IN_SUCCESS',
      payload: {
        info
      }
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      info
    })
  })

  it('Should return the unchanged state if it does not contain any action', () => {
    const state = UserReducer(undefined, { type: 'non-valid-type' })

    expect(state).toEqual(INITIAL_STATE)
  })
})
