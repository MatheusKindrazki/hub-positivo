import React from 'react'

import { store } from '~/store'

import { render, CustomState, fireEvent } from '@psdhub/test-utils'

import history from '~/services/history'

import ExpiredToken from '~/pages/Auth/ExpiredToken'

jest.mock('~/services/history', () => ({
  push: jest.fn()
}))

describe('Expired Token page should work properly', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const CUSTOM_STATE: CustomState = {
    forgotPassword: {
      validateViewPin: true
    }
  }

  const spyPush = jest.spyOn(history, 'push')

  const setup = (rest: CustomState | object) => {
    const utils = render(<ExpiredToken />, {
      store,
      reducers: ['forgotPassword'],
      CUSTOM_STATE: rest
    })
    return { ...utils }
  }

  it('Should redirect to `/` when `validateViewPin` doesn`t exist or it`s false', () => {
    setup({})

    expect(spyPush).toHaveBeenCalledTimes(1)
    expect(spyPush).toHaveBeenCalledWith('/')
  })

  it('Should render the correcly elements on screen', () => {
    const { queryByText } = setup(CUSTOM_STATE)

    const message = queryByText(
      /Solicite um novo link para redefinir sua senha./i
    )
    const expiredLinkTitle = queryByText(/O link expirou/i)
    const newLinkButton = queryByText(/Solicitar novo link/i)

    expect(message).toBeInTheDocument()
    expect(expiredLinkTitle).toBeInTheDocument()
    expect(newLinkButton).toBeInTheDocument()
  })

  it('Should redirect to `/esqueci-minha-senha` when `Solicitar novo link` is clicked', () => {
    const { getByText } = setup(CUSTOM_STATE)
    const newLinkButton = getByText(/Solicitar novo link/i)

    expect(newLinkButton).toBeInTheDocument()

    fireEvent.click(newLinkButton)

    expect(spyPush).toHaveBeenCalledTimes(1)
    expect(spyPush).toHaveBeenCalledWith('/esqueci-minha-senha')
  })

  it('Should redirect to `/login` when `GoBack` is clicked', () => {
    const { getByTestId } = setup(CUSTOM_STATE)
    const goBackButton = getByTestId('go-back')

    expect(goBackButton).toBeInTheDocument()

    fireEvent.click(goBackButton)

    expect(spyPush).toHaveBeenCalledTimes(1)
    expect(spyPush).toHaveBeenCalledWith('/login')
  })
})
