import * as forgotActions from '~/store/modules/forgotPassword/actions'

describe('Action of forgotPassword history', () => {
  it('Should the validatePinRequest calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(forgotActions, 'validatePinRequest')

    const mockedType = {
      type: '@auth/VALIDATE_PIN_REQUEST'
    }

    const resolved = forgotActions.validatePinRequest({ pin: '123' })

    expect(spy).toBeCalledWith({ pin: '123' })

    expect(resolved).toEqual({ ...mockedType, payload: { pin: '123' } })
  })

  it('Should the pwdTokenSuccess calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(forgotActions, 'validatePinSuccess')

    const mockedType = {
      type: '@auth/VALIDATE_PIN_SUCCESS'
    }

    const resolved = forgotActions.validatePinSuccess(true)

    expect(spy).toBeCalledWith(true)

    expect(resolved).toEqual({ ...mockedType, payload: true })
  })

  it('Should the validatePinFailure', () => {
    const spy = jest.spyOn(forgotActions, 'validatePinFailure')

    const mockedType = {
      type: '@auth/VALIDATE_PIN_FAILURE'
    }

    const resolved = forgotActions.validatePinFailure()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should the pwdTokenRequest calls the correct action and receive the value within payload', () => {
    const spy = jest.spyOn(forgotActions, 'pwdTokenRequest')

    const mockedType = {
      type: '@auth/PWD_TOKEN_REQUEST'
    }

    const resolved = forgotActions.pwdTokenRequest({ userInfo: 'John Doe' })

    expect(spy).toBeCalledWith({ userInfo: 'John Doe' })

    expect(resolved).toEqual({
      ...mockedType,
      payload: { userInfo: 'John Doe' }
    })
  })

  it('Should the pwdTokenSuccess calls the correct action', () => {
    const spy = jest.spyOn(forgotActions, 'pwdTokenSuccess')

    const mockedType = {
      type: '@auth/PWD_TOKEN_SUCCESS'
    }

    const resolved = forgotActions.pwdTokenSuccess()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })

  it('Should the pwdTokenFailure calls the correct action', () => {
    const spy = jest.spyOn(forgotActions, 'pwdTokenFailure')

    const mockedType = {
      type: '@auth/PWD_TOKEN_FAILURE'
    }

    const resolved = forgotActions.pwdTokenFailure()

    expect(spy).toBeCalled()

    expect(resolved).toEqual({ ...mockedType })
  })
})
