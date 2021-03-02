import React from 'react'

import { store } from '~/store'

import { render, CustomState, fireEvent } from '@hub/test-utils'

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

  it('Should redirect to `/` when `validateViewPin` doesn`t exist or it`s false', () => {
    render(<ExpiredToken />, {
      store,
      reducers: ['forgotPassword']
    })

    expect(spyPush).toHaveBeenCalledTimes(1)
    expect(spyPush).toHaveBeenCalledWith('/')
  })

  it('Should render the correcly elements on screen', () => {
    const { queryByText } = render(<ExpiredToken />, {
      store,
      reducers: ['forgotPassword'],
      CUSTOM_STATE
    })

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
    const wrapper = render(<ExpiredToken />, {
      store,
      reducers: ['forgotPassword'],
      CUSTOM_STATE
    })
    const { getByText } = wrapper
    const newLinkButton = getByText(/Solicitar novo link/i)

    expect(newLinkButton).toBeInTheDocument()

    fireEvent.click(newLinkButton)

    expect(spyPush).toHaveBeenCalledTimes(1)
    expect(spyPush).toHaveBeenCalledWith('/esqueci-minha-senha')
  })

  it('Should redirect to `/login` when `GoBack` is clicked', () => {
    const wrapper = render(<ExpiredToken />, {
      store,
      reducers: ['forgotPassword'],
      CUSTOM_STATE
    })
    const { getByTestId } = wrapper
    const goBackButton = getByTestId('go-back')

    expect(goBackButton).toBeInTheDocument()

    fireEvent.click(goBackButton)

    expect(spyPush).toHaveBeenCalledTimes(1)
    expect(spyPush).toHaveBeenCalledWith('/login')
  })
})
