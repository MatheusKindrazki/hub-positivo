import React from 'react'

import { store } from '~/store'

import { CustomState, StoreUtils } from '@psdhub/test-utils/types'
import { fireEvent, render, waitFor } from '@psdhub/test-utils'

import history from '~/services/history'

import ForgotPassword from '~/pages/Auth/ForgotPassword'

import validator from '~/validators/auth/forgotPassword'

jest.mock('~/services/history', () => ({
  push: jest.fn(),
  goBack: jest.fn()
}))

describe('Forgot Password page should work properly', () => {
  it('should display instructions about password recovery', async () => {
    const { getByText } = render(<ForgotPassword />, {
      reducers: ['forgotPassword'],
      store
    })
    const instructionMessage = getByText(/Insira seu nome de usuário/i)
    expect(instructionMessage).toBeInTheDocument()
  })

  it('Should display an error toast if submit with empty input', async () => {
    const { getByText, findByText } = render(<ForgotPassword />, {
      reducers: ['forgotPassword'],
      store
    })
    const forgotPwdButton = getByText('Solicitar Link')

    // gerando erro ao clicar submeter form sem valor no input
    fireEvent.click(forgotPwdButton)
    const errorMessage = await findByText(/Algo deu errado/i)
    expect(errorMessage).toBeInTheDocument()
  })

  it('Should display an error toast if validator throws a generic error', async () => {
    // gerando erro fazendo com que validate devolva um erro generico
    jest.spyOn(validator, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const { getByText, findByText } = render(<ForgotPassword />, {
      reducers: ['forgotPassword'],
      store
    })

    const forgotPwdButton = getByText('Solicitar Link')
    fireEvent.click(forgotPwdButton)

    const toast = await findByText(/Algo deu errado/i)

    expect(toast).toBeInTheDocument()
  })

  it('Should redirect client to login page if sendViewToken is true', () => {
    const CUSTOM_STATE: CustomState = {
      forgotPassword: {
        sendViewToken: true
      }
    }
    const pushSpy = jest.spyOn(history, 'push')

    render(<ForgotPassword />, {
      reducers: ['forgotPassword'],
      CUSTOM_STATE,
      store
    })
    expect(pushSpy).toHaveBeenCalledWith('/')
  })

  it('should go back when GoBack is clicked', () => {
    const goBackSpy = jest.spyOn(history, 'goBack')

    const { getByTestId } = render(<ForgotPassword />, {
      reducers: ['forgotPassword'],
      store
    })
    const goBack = getByTestId('go-back')
    fireEvent.click(goBack)
    expect(goBackSpy).toHaveBeenCalled()
  })

  it('Should dispatch an action with correct payload', async () => {
    const mockedData = {
      payload: { userInfo: 'teste@testmail.com' },
      type: '@auth/PWD_TOKEN_REQUEST'
    }

    const { getByText, getByPlaceholderText, storeUtils } = render(
      <ForgotPassword />,
      {
        reducers: ['forgotPassword'],
        store
      }
    )

    const forgotPwdInput = getByPlaceholderText('Usuário, E-mail ou CPF')
    const forgotPwdButton = getByText('Solicitar Link')

    fireEvent.change(forgotPwdInput, {
      target: { value: 'teste@testmail.com' }
    })
    fireEvent.click(forgotPwdButton)
    const { getActions } = storeUtils as StoreUtils
    const actions = getActions()

    await waitFor(() => expect(actions[0]).toStrictEqual(mockedData))
  })
})
