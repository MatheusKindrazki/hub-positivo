import ForgotReducer, {
  INITIAL_STATE
} from '~/store/modules/forgotPassword/reducer'
import * as forgotActions from '~/store/modules/forgotPassword/actions'

describe('Reducer of authentication history', () => {
  it('Should change the state of load in the firing of the request of Request', () => {
    const action = forgotActions.pwdTokenRequest({ userInfo: 'John Doe' })

    const state = ForgotReducer(undefined, action)

    expect(state.loading).toEqual(true)
  })

  it('Should set the loading as false if the call fails', () => {
    const action = forgotActions.pwdTokenFailure()

    const state = ForgotReducer(INITIAL_STATE, action)

    expect(state.loading).toEqual(false)
  })

  it('Should set the View Token to True in application success', () => {
    const action = forgotActions.pwdTokenSuccess()

    const state = ForgotReducer(undefined, action)

    expect(state.loading).toEqual(false)
    expect(state.sendViewToken).toEqual(true)
  })

  it('Should Set Loading How to True Call for PIN Validation', () => {
    const action = forgotActions.validatePinRequest({ pin: '123' })

    const state = ForgotReducer(undefined, action)

    expect(state.loading).toEqual(true)
  })

  it('Should Set Loading How to False Call for PIN Validation', () => {
    const action = forgotActions.validatePinFailure()

    const state = ForgotReducer(INITIAL_STATE, action)

    expect(state.loading).toEqual(false)
  })

  it('Should Save the Pin Payload Case Success', () => {
    const action = forgotActions.validatePinSuccess(true)

    const state = ForgotReducer(undefined, action)

    expect(state.validateViewPin).toEqual(true)
    expect(state.validatePin).toEqual(true)
  })

  it('Should return the unchanged state if it does not contain any action', () => {
    const state = ForgotReducer(undefined, { type: 'non-valid-type' })

    expect(state).toEqual(INITIAL_STATE)
  })
})
