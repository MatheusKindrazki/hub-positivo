import React from 'react'

import * as reactDom from 'react-router-dom'

import * as redux from 'react-redux'

import { store } from '~/store'

import {
  render,
  fireEvent,
  waitFor,
  CustomRenderOptions
} from '@hub/test-utils'

import * as ReCAPTCHA from '~/utils/reCaptcha'

import SignIn from '~/pages/Auth/SignIn'

import signInValidator from '~/validators/auth/signIn'
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
      search: {
        get: (redirect: string) => redirect
      }
    }),
    useHistory: jest.fn()
  }
})

jest.mock('react-redux', () => {
  const rest = jest.requireActual('react-redux')
  return {
    ...rest,
    useDispatch: jest.fn().mockReturnValue(() => jest.fn())
  }
})

jest.mock('~/utils/reCaptcha', () => ({
  handleCaptcha: jest.fn(),
  checkForStrikes: jest.fn()
}))

interface HistoryReturn {
  push: () => void
  location: {
    pathname: string
  }
}

describe('Testing that the Login page works correctly', () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, {
      REACT_APP_RECAPTCHA_SITE_KEY: '6LeT8ioaAAAAAIicz2pY2Q-opHa-MV45qsA9vZUX'
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const dispatch = jest.fn()
  const push = jest.fn()
  const history: HistoryReturn = {
    location: {
      pathname: '/login'
    },
    push
  }

  const spyValidate = jest.spyOn(signInValidator, 'validate')
  jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)
  jest.spyOn(reactDom, 'useHistory').mockReturnValue(history as any)

  const queryConfig = { exact: false }

  const contextConfig: CustomRenderOptions = {
    store,
    reducers: ['auth']
  }

  it('should redirect the user to /esqueci-minha-senha when click on `Esqueci minha senha`', () => {
    const { getByText } = render(<SignIn />, contextConfig)
    const forgotPasswordButton = getByText('Esqueci minha senha', queryConfig)
    fireEvent.click(forgotPasswordButton)
    expect(push).toHaveBeenCalledWith('/esqueci-minha-senha')
  })

  it('should open help modal when click on `Precido de ajuda`', async () => {
    const { getByText } = render(<SignIn />, contextConfig)
    const helpButton = getByText('Preciso de ajuda', queryConfig)
    fireEvent.click(helpButton)
    expect(helpButton).toBeInTheDocument()
  })

  it('should change password input type when view icon is clicked', async () => {
    const { getByTestId } = render(<SignIn />, contextConfig)
    const viewIcon = getByTestId('view-button')
    const passwordInput = getByTestId('password')

    expect(passwordInput).toHaveProperty('type', 'password')
    fireEvent.click(viewIcon)
    expect(passwordInput).toHaveProperty('type', 'text')
  })

  it('Should render the elements of the Login page', () => {
    const { queryAllByText, queryByText, queryByPlaceholderText } = render(
      <SignIn />,
      contextConfig
    )
    const signIn = queryAllByText('entrar', queryConfig)
    const welcomeMessage = queryByText(
      'Insira seus dados de acesso para começar',
      queryConfig
    )
    const emailPlaceholder = queryByPlaceholderText(
      'Digite seu usuário',
      queryConfig
    )
    const passwordPlaceholder = queryByPlaceholderText(
      'Digite sua senha',
      queryConfig
    )

    expect(signIn.length).toBe(2)
    expect(welcomeMessage).toBeInTheDocument()
    expect(emailPlaceholder).toBeInTheDocument()
    expect(passwordPlaceholder).toBeInTheDocument()
  })

  it('should dispatch @auth/SIGN_IN REQUEST with the right payload if the user data format is correct', async () => {
    const userMock = {
      username: 'teste',
      password: 'passwordteste'
    }

    const { username, password } = userMock
    const { getByTestId } = render(<SignIn />, contextConfig)

    const usernameInput = getByTestId('email')
    const passwordInput = getByTestId('password')
    const submitButton = getByTestId('submit-button')
    const form = getByTestId('submit-form')

    fireEvent.change(usernameInput, { target: { value: username } })
    fireEvent.change(passwordInput, {
      target: { value: password }
    })

    expect(submitButton).toHaveProperty('type', 'submit')
    expect(usernameInput).toHaveValue(username)
    expect(passwordInput).toHaveValue(password)

    await waitFor(() => fireEvent.submit(form))
    expect(spyValidate).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        ...userMock,
        redirect: undefined
      },
      type: '@auth/SIGN_IN_REQUEST'
    })
  })

  it('should throw a validation error when username and password input are empty', async () => {
    const { getByTestId, findByText } = render(<SignIn />, contextConfig)

    const form = getByTestId('submit-button')

    await waitFor(() => fireEvent.click(form))

    const userError = await findByText('usuário obrigatório', queryConfig)
    const passwordError = await findByText('senha obrigatória', queryConfig)

    expect(userError).toBeInTheDocument()
    expect(passwordError).toBeInTheDocument()
  })

  it('should throw new error when username or password input are incorrect', async () => {
    spyValidate.mockImplementation(() => {
      throw new Error()
    })
    const { getByTestId, findByText } = render(<SignIn />, contextConfig)

    const form = getByTestId('submit-button')

    await waitFor(() => fireEvent.click(form))
    const errorMessage = await findByText(
      'Algo deu errado, Verifique seus dados e tente novamente!',
      queryConfig
    )
    expect(errorMessage).toBeInTheDocument()
  })

  it('should change the type of the submit button to button type when sign-in strike is true', async () => {
    const CUSTOM_STATE = {
      auth: {
        signInStrike: true
      }
    }
    jest.spyOn(ReCAPTCHA, 'handleCaptcha').mockResolvedValue(true)
    jest.spyOn(ReCAPTCHA, 'checkForStrikes').mockImplementation(() => true)

    const { getByTestId } = render(<SignIn />, {
      store,
      reducers: ['auth'],
      CUSTOM_STATE
    })
    const button = getByTestId('submit-button')

    expect(button).toHaveProperty('type', 'button')
    await waitFor(() => fireEvent.click(button))
  })
})
