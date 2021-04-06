import React from 'react'

import { store } from '~/store'

import { fireEvent, render, StoreUtils, waitFor } from '@psdhub/test-utils'

import history from '~/services/history'

import ChangePassword from '~/pages/Auth/ChangePassword'

import passValidation from '~/validators/auth/createNewPassword'

// mockando useQuery para retornar token mockado
const mockedGet = jest.fn((): any => {
  return { token: 'this is a test token' }
})
jest.mock('~/hooks/useQuery', () => {
  return () => {
    return {
      get: mockedGet
    }
  }
})

const setup = () => {
  const utils = render(<ChangePassword />, {
    reducers: ['user', 'forgotPassword'],
    store
  })

  const pwdInput = utils.getByPlaceholderText('Nova senha')
  const confirmPwdInput = utils.getByPlaceholderText('Confirmar nova senha')
  const showPwdButton = utils.getAllByTestId('display-pwd-btn')
  const submitButton = utils.getByText('Salvar nova senha')
  const goBackButton = utils.getByTestId('go-back')
  return {
    pwdInput,
    confirmPwdInput,
    showPwdButton,
    submitButton,
    goBackButton,
    ...utils
  }
}

describe('Change Password page should work properly', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  it('should change input type if view changes', async () => {
    const { showPwdButton, pwdInput, confirmPwdInput } = setup()

    await waitFor(() => showPwdButton.map(button => fireEvent.click(button)))

    expect(pwdInput).toHaveAttribute('type', 'text')
    expect(confirmPwdInput).toHaveAttribute('type', 'text')
  })

  it('should redirect user if no token was provided', async () => {
    mockedGet.mockImplementationOnce(() => false)
    const pushSpy = jest.spyOn(history, 'push')

    setup()
    jest.runAllTimers()

    expect(pushSpy).toHaveBeenCalledWith('/login')
  })

  it('should return user to previous page when goBack is clicked', async () => {
    const pushSpy = jest.spyOn(history, 'push')

    const { goBackButton } = setup()

    fireEvent.click(goBackButton)
    jest.runAllTimers()

    expect(pushSpy).toHaveBeenCalledWith('/login')
  })

  it('should display an error when validation fails', async () => {
    const { pwdInput, confirmPwdInput, submitButton, findByText } = setup()

    // clicando no submit button com uma senha curta demais para causar erro
    fireEvent.change(pwdInput, { target: { value: '123' } })
    fireEvent.change(confirmPwdInput, { target: { value: '123' } })
    fireEvent.click(submitButton)

    const errorMessage = await findByText(/senha deve ter no mínimo/i)

    await waitFor(() => expect(errorMessage).toBeInTheDocument())
  })

  it('should display a generic error when validation throws it', async () => {
    // mockando validator para retornar erro generico
    jest.spyOn(passValidation, 'validate').mockImplementation(() => {
      throw new Error()
    })

    const { submitButton, findByText } = setup()

    fireEvent.click(submitButton)

    const errorMessage = await findByText(/Algo deu errado/i)

    await waitFor(() => expect(errorMessage).toBeInTheDocument())
  })

  it('Should dispatch actions with correct payloads', async () => {
    jest.spyOn(passValidation, 'validate').mockImplementation()
    const mockedTokenPayload = { pin: { token: 'this is a test token' } }
    const mockedPwdPayload = {
      newPassword: 'teste123',
      pin: { token: 'this is a test token' }
    }

    const { storeUtils, pwdInput, confirmPwdInput, submitButton } = setup()
    const { getActions } = storeUtils as StoreUtils
    const actions = getActions()

    fireEvent.change(pwdInput, { target: { value: 'teste123' } })

    fireEvent.change(confirmPwdInput, { target: { value: 'teste123' } })

    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(actions[0].payload).toStrictEqual(mockedTokenPayload)
    )
    await waitFor(() =>
      expect(actions[1].payload).toStrictEqual(mockedPwdPayload)
    )
  })
})
