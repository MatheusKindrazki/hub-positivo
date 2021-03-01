import React, { ReactElement } from 'react'

import * as redux from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '~/store'

import { fireEvent, render, waitFor } from '@hub/test-utils'

import history from '~/services/history'

import ForgotPassword from '~/pages/Auth/ForgotPassword'

import validator from '~/validators/auth/forgotPassword'

jest.mock('react-redux', () => {
  const ui = jest.requireActual('react-redux')
  return {
    ...ui,
    useDispatch: jest.fn()
    // useSelector: jest.fn()
  }
})
jest.mock('~/services/history', () => ({
  push: jest.fn(),
  goBack: jest.fn()
}))

describe('Forgot Password page should work properly', () => {
  const CUSTOM_STATE = {
    forgotPassword: {
      loading: false,
      validatePin: false,
      validateViewPin: false,
      sendViewToken: false
    }
  }
  it('should display instructions about password recovery', async () => {
    const { getByText } = render(<ForgotPassword />, {
      states: ['forgotPassword'],
      CUSTOM_STATE
    })
    const instructionMessage = getByText(/Insira seu nome de usuário/i)
    expect(instructionMessage).toBeInTheDocument()
  })

  it('Should display an error toast if submit with empty input', async () => {
    const { getByText, findByText } = render(<ForgotPassword />, {
      states: ['forgotPassword'],
      CUSTOM_STATE
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
      states: ['forgotPassword'],
      CUSTOM_STATE
    })

    const forgotPwdButton = getByText('Solicitar Link')
    fireEvent.click(forgotPwdButton)

    const toast = await findByText(/Algo deu errado/i)

    expect(toast).toBeInTheDocument()
  })

  it('Should redirect client to login page if sendViewToken is true', () => {
    const pushSpy = jest.spyOn(history, 'push')

    CUSTOM_STATE.forgotPassword.sendViewToken = true
    render(<ForgotPassword />, {
      states: ['forgotPassword'],
      CUSTOM_STATE
    })
    expect(pushSpy).toHaveBeenCalledWith('/')
  })

  it('should go back when GoBack is clicked', () => {
    const goBackSpy = jest.spyOn(history, 'goBack')

    const { getByTestId } = render(<ForgotPassword />, {
      states: ['forgotPassword'],
      CUSTOM_STATE
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
    const dispatch = jest.fn()
    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    const { getByText, getByPlaceholderText } = render(<ForgotPassword />, {
      states: ['forgotPassword'],
      CUSTOM_STATE
    })

    const forgotPwdInput = getByPlaceholderText('Usuário, E-mail ou CPF')
    const forgotPwdButton = getByText('Solicitar Link')

    fireEvent.change(forgotPwdInput, {
      target: { value: 'teste@testmail.com' }
    })
    fireEvent.click(forgotPwdButton)

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(mockedData))
  })
})
