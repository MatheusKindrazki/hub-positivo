import React from 'react'

import { store } from '~/store'

import { fireEvent, render, StoreUtils, waitFor } from '@hub/test-utils'

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

describe('Forgot Password page should work properly', () => {
  it('should change input type if view changes', async () => {
    const { getByPlaceholderText, getAllByTestId } = render(
      <ChangePassword />,
      {
        reducers: ['user', 'forgotPassword'],
        store
      }
    )

    const displayPwdBtns = getAllByTestId('display-pwd-btn')
    const pwdInput = getByPlaceholderText('Nova senha')
    const pwdCheckInput = getByPlaceholderText('Confirmar nova senha')

    await waitFor(() => displayPwdBtns.map(button => fireEvent.click(button)))
    expect(pwdInput).toHaveAttribute('type', 'text')
    expect(pwdCheckInput).toHaveAttribute('type', 'text')
  })

  it('should redirect user if no token was provided', async () => {
    mockedGet.mockImplementationOnce(() => false)
    const pushSpy = jest.spyOn(history, 'push')
    render(<ChangePassword />, {
      reducers: ['user', 'forgotPassword'],
      store
    })

    expect(pushSpy).toHaveBeenCalledWith('/login')
  })

  it('should return user to previous page when goBack is clicked', async () => {
    mockedGet.mockImplementationOnce(() => false)
    const pushSpy = jest.spyOn(history, 'push')
    const { getByTestId } = render(<ChangePassword />, {
      reducers: ['user', 'forgotPassword'],
      store
    })

    const goBack = getByTestId('go-back')

    fireEvent.click(goBack)

    expect(pushSpy).toHaveBeenCalledWith('/login')
  })

  it('should display an error when validation fails', async () => {
    const { getByText, findByText, getByPlaceholderText } = render(
      <ChangePassword />,
      {
        reducers: ['user', 'forgotPassword'],
        store
      }
    )
    const pwdInput = getByPlaceholderText('Nova senha')
    const pwdCheckInput = getByPlaceholderText('Confirmar nova senha')
    const formButton = getByText('Salvar nova senha')

    // clicando no submit button com uma senha curta demais para causar erro
    fireEvent.change(pwdInput, { target: { value: '123' } })
    fireEvent.change(pwdCheckInput, { target: { value: '123' } })
    fireEvent.click(formButton)

    const errorMessage = await findByText(/senha deve ter no mínimo/i)

    await waitFor(() => expect(errorMessage).toBeInTheDocument())
  })

  it('should display a generic error when validation throws it', async () => {
    // mockando validator para retornar erro generico
    jest.spyOn(passValidation, 'validate').mockImplementation(() => {
      throw new Error()
    })
    const { getByText, findByText } = render(<ChangePassword />, {
      reducers: ['user', 'forgotPassword'],
      store
    })

    const formButton = getByText('Salvar nova senha')

    fireEvent.click(formButton)

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

    const { storeUtils, getByPlaceholderText, getByText } = render(
      <ChangePassword />,
      {
        reducers: ['user', 'forgotPassword'],
        store
      }
    )

    const pwdInput = getByPlaceholderText('Nova senha')
    const pwdCheckInput = getByPlaceholderText('Confirmar nova senha')
    const formButton = getByText('Salvar nova senha')
    const { getActions } = storeUtils as StoreUtils
    const actions = getActions()

    fireEvent.change(pwdInput, { target: { value: 'teste123' } })

    fireEvent.change(pwdCheckInput, { target: { value: 'teste123' } })

    fireEvent.click(formButton)

    await waitFor(() =>
      expect(actions[0].payload).toStrictEqual(mockedTokenPayload)
    )
    await waitFor(() =>
      expect(actions[1].payload).toStrictEqual(mockedPwdPayload)
    )
  })
})
