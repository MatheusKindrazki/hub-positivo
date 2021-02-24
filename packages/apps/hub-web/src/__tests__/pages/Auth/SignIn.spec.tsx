import React from 'react'

import { render } from '@hub/test-utils'

import SignIn from '~/pages/Auth/SignIn'
import '@testing-library/jest-dom'

jest.mock('react', () => {
  const ui = jest.requireActual('react')
  return {
    ...ui,
    useQuery: jest.fn(() => ({
      get: jest.fn()
    }))
  }
})

jest.mock('react-router-dom', () => {
  const rest = jest.requireActual('react-router-dom')
  return {
    ...rest,
    useLocation: () => ({
      pathname: '/login',
      search: ''
    }),
    useHistory: () => ({
      location: {
        pathname: '/login'
      },
      push: jest.fn()
    })
  }
})

jest.mock('react-redux', () => {
  const rest = jest.requireActual('react-redux')
  return {
    ...rest,
    useDispatch: jest.fn(),
    useSelector: jest.fn(() => ({
      loading: false,
      signInStrike: false
    }))
  }
})

describe('Testing that the Login page works correctly', () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, {
      REACT_APP_RECAPTCHA_SITE_KEY: '6LeT8ioaAAAAAIicz2pY2Q-opHa-MV45qsA9vZUX'
    })
  })

  it('Should render the elements of the Login page', () => {
    const { queryAllByText, queryByText, queryByPlaceholderText } = render(
      <SignIn />
    )
    const config = { exact: false }
    const signIn = queryAllByText('entrar', config)
    const welcomeMessage = queryByText(
      'Insira seus dados de acesso para começar',
      config
    )
    const emailPlaceholder = queryByPlaceholderText('Digite seu usuário')
    const passwordPlaceholder = queryByPlaceholderText('Digite sua senha')

    expect(signIn.length).toBe(2)
    expect(welcomeMessage).toBeInTheDocument()
    expect(emailPlaceholder).toBeInTheDocument()
    expect(passwordPlaceholder).toBeInTheDocument()
  })
})
