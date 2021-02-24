import React from 'react'

import * as redux from 'react-redux'

import { fireEvent, render, waitFor } from '@hub/test-utils'

import history from '~/services/history'

import ForgotPassword from '~/pages/Auth/ForgotPassword'

import validator from '~/validators/auth/forgotPassword'

import '@testing-library/jest-dom'

jest.mock('react-redux', () => {
  const ui = jest.requireActual('react-redux')
  return {
    ...ui,
    useDispatch: jest.fn(),
    useSelector: jest.fn()
  }
})

describe('Forgot Password page should work properly', () => {
  it('Should display a instruction message to the client', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(() => {
      return { loading: false, sendViewToken: false }
    })
    const { getByText } = render(<ForgotPassword />)
    const instructionMessage = getByText(/Insira seu nome de usuário/i)
    expect(instructionMessage).toBeInTheDocument()
  })

  it('Should display an error toast when formRef has an error', async () => {
    const { getByText, findByText } = render(<ForgotPassword />)
    const forgotPwdButton = getByText('Solicitar Link')

    // gerando erro ao clicar submeter form sem valor no input
    fireEvent.click(forgotPwdButton)
    const errorMessage = await findByText(/Algo deu errado/i)
    expect(errorMessage).toBeInTheDocument()
    expect(redux.useSelector).toHaveBeenCalledTimes(4)

    // gerando erro fazendo com que validate devolva um erro generico
    jest.spyOn(validator, 'validate')
    render(<ForgotPassword />)
  })

  it('Should redirect client to login page if sendViewToken is true', () => {
    const pushSpy = jest.spyOn(history, 'push')
    jest.spyOn(redux, 'useSelector').mockImplementation(() => {
      return { sendViewToken: true }
    })

    render(<ForgotPassword />)
    expect(pushSpy).toHaveBeenCalledWith('/')
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
