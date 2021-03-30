import React from 'react'

import * as reactDom from 'react-router-dom'

import { store } from '~/store'

import { render, CustomState, fireEvent } from '@hub/test-utils'

import ForgotFail from '~/pages/Auth/ForgotFail'

jest.mock('react-router-dom', () => {
  const rest = jest.requireActual('react-router-dom')
  return {
    ...rest,
    useHistory: jest.fn()
  }
})

interface HistoryReturn {
  push: () => void
  goBack: () => void
}

describe('Expired Token page should work properly', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const push = jest.fn()
  const goBack = jest.fn()

  const history: HistoryReturn = {
    push,
    goBack
  }

  jest.spyOn(reactDom, 'useHistory').mockReturnValue(history as any)

  const CUSTOM_STATE: CustomState = {
    forgotPassword: {
      sendViewToken: true
    }
  }

  const setup = (rest: CustomState | object) => {
    const utils = render(<ForgotFail />, {
      store,
      reducers: ['forgotPassword'],
      CUSTOM_STATE: rest
    })
    return { ...utils }
  }

  it('Should redirect to `/login` when `sendViewToken` doesn`t exist or it`s false', () => {
    setup({})

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/login')
  })

  it('Should render the correcly elements on screen', () => {
    const { queryByText } = setup(CUSTOM_STATE)

    const failLinkTitle = queryByText(/O link não pôde ser enviado/i)
    const message = queryByText(
      /Entre em contato com sua escola para realizar essa requisição/i
    )
    const goBackLoginButton = queryByText(/Voltar para o login/i)

    expect(failLinkTitle).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    expect(goBackLoginButton).toBeInTheDocument()
  })

  it('Should redirect to `/login` when `Voltar para o login` is clicked', () => {
    jest.useFakeTimers()

    const { getByText } = setup(CUSTOM_STATE)

    const goBackToLogin = getByText(/Voltar para o login/i)

    expect(goBackToLogin).toBeInTheDocument()

    fireEvent.click(goBackToLogin)
    jest.runAllTimers()

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/login')
  })

  it('Should redirect to `/login` when `GoBack` is clicked', () => {
    const { getByTestId } = setup(CUSTOM_STATE)

    const goBackButton = getByTestId('go-back')

    expect(goBackButton).toBeInTheDocument()

    fireEvent.click(goBackButton)

    expect(goBack).toHaveBeenCalledTimes(1)
    expect(goBack).toHaveBeenCalled()
  })
})
