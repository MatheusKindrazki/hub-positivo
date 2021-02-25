import React, { ReactElement } from 'react'

import * as redux from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '~/store'

import { fireEvent, render, waitFor } from '@hub/test-utils'

import history from '~/services/history'

import ForgotPassword from '~/pages/Auth/ForgotPassword'

import validator from '~/validators/auth/forgotPassword'

import '@testing-library/jest-dom'

const renderWithContext = (children: ReactElement) => {
  return render(
    <redux.Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </redux.Provider>
  )
}

jest.mock('react-redux', () => {
  const ui = jest.requireActual('react-redux')
  return {
    ...ui,
    useDispatch: jest.fn(),
    useSelector: jest.fn()
  }
})
jest.mock('~/services/history', () => ({
  push: jest.fn(),
  goBack: jest.fn()
}))

describe('Forgot Password page should work properly', () => {
  it('should display instructions about password recovery', async () => {
    // utilizando a store original neste teste para obter coverage sobre
    // funcoes anonimas passadas ao useSelector
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation(state =>
        jest.requireActual('react-redux').useSelector(state)
      )
    const { getByText } = renderWithContext(<ForgotPassword />)
    const instructionMessage = getByText(/Insira seu nome de usuário/i)
    expect(instructionMessage).toBeInTheDocument()
  })

  it('Should display an error toast if submit with empty input', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(() => {
      return { loading: false, sendViewToken: false }
    })
    const { getByText, findByText } = render(<ForgotPassword />)
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
    const { getByText, findByText } = render(<ForgotPassword />)

    const forgotPwdButton = getByText('Solicitar Link')
    fireEvent.click(forgotPwdButton)

    const toast = await findByText(/Algo deu errado/i)

    expect(toast).toBeInTheDocument()
  })

  it('Should redirect client to login page if sendViewToken is true', () => {
    const pushSpy = jest.spyOn(history, 'push')
    jest.spyOn(redux, 'useSelector').mockImplementation(() => {
      return { sendViewToken: true }
    })

    render(<ForgotPassword />)
    expect(pushSpy).toHaveBeenCalledWith('/')
  })

  it('should go back when GoBack is clicked', () => {
    const goBackSpy = jest.spyOn(history, 'goBack')
    jest.spyOn(redux, 'useSelector').mockImplementation(() => {
      return { sendViewToken: false }
    })

    const { getByTestId } = render(<ForgotPassword />)
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
    jest
      .spyOn(redux, 'useSelector')
      .mockReturnValue({ sendViewToken: false, loading: false })

    const { getByText, getByPlaceholderText } = render(<ForgotPassword />)

    const forgotPwdInput = getByPlaceholderText('Usuário, E-mail ou CPF')
    const forgotPwdButton = getByText('Solicitar Link')

    fireEvent.change(forgotPwdInput, {
      target: { value: 'teste@testmail.com' }
    })
    fireEvent.click(forgotPwdButton)

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(mockedData))
  })
})
