import React from 'react'

import { useHistory } from 'react-router-dom'
import { renderHook } from '@testing-library/react-hooks'

import * as redux from 'react-redux'

import { render, fireEvent, waitFor } from '@hub/test-utils'

import * as ReCAPTCHA from '~/utils/reCaptcha'

import SignIn from '~/pages/Auth/SignIn'

import signInValidator from '~/validators/auth/signIn'

import '@testing-library/jest-dom'
// import { ValidationError, getValidationErrors } from '~/validators'

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
    useDispatch: jest.fn().mockReturnValue(() => jest.fn()),
    useSelector: jest.fn(() => ({
      loading: false,
      signInStrike: false
    }))
  }
})

jest.mock('~/utils/reCaptcha', () => ({
  handleCaptcha: jest.fn(),
  checkForStrikes: jest.fn()
}))

// jest.mock('~/validators/auth/signIn', () => ({
//   validate: jest.fn()
// }))

// const renderWithContext = (children: ReactElement) => {
//   return render(
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>{children}</PersistGate>
//     </Provider>
//   )
// }

describe('Testing that the Login page works correctly', () => {
  const dispatch = jest.fn()
  const spyValidate = jest.spyOn(signInValidator, 'validate')
  jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

  const queryConfig = { exact: false }

  beforeAll(() => {
    process.env = Object.assign(process.env, {
      REACT_APP_RECAPTCHA_SITE_KEY: '6LeT8ioaAAAAAIicz2pY2Q-opHa-MV45qsA9vZUX'
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  it('', () => {
    // spyUseHistory.mockReturnValue({ push })
    // const {
    //   result: { current }
    // } = renderHook(() => useHistory())
    // const { getByText } = render(<SignIn />)
    // const forgotPasswordButton = getByText('Esqueci minha senha', queryConfig)
    // const spyCurrent = jest.spyOn(current, 'push')
    // fireEvent.click(forgotPasswordButton)
    // expect(spyCurrent).toHaveBeenCalledWith('/forgot-password')
  })
  it('Should render the elements of the Login page', () => {
    const { queryAllByText, queryByText, queryByPlaceholderText } = render(
      <SignIn />
    )
    const signIn = queryAllByText('entrar', queryConfig)
    const welcomeMessage = queryByText(
      'Insira seus dados de acesso para começar',
      queryConfig
    )
    const emailPlaceholder = queryByPlaceholderText('Digite seu usuário')
    const passwordPlaceholder = queryByPlaceholderText('Digite sua senha')

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
    const wrapper = render(<SignIn />)
    const { getByTestId } = wrapper

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

  it('should throw a error when username and password input are empty', async () => {
    const wrapper = render(<SignIn />)
    const { getByTestId, findByText } = wrapper

    const form = getByTestId('submit-button')

    await waitFor(() => fireEvent.click(form))

    const userError = await findByText('usuário obrigatório', queryConfig)
    const passwordError = await findByText('senha obrigatória', queryConfig)

    expect(userError).toBeInTheDocument()
    expect(passwordError).toBeInTheDocument()
  })

  it('should call handleCaptcha when signInStrike is true and type button is not submit', async () => {
    // jest.spyOn(redux, 'useSelector').mockReturnValueOnce({
    //   loading: false,
    //   signInStrike: true
    // })
    // const spyHandleCaptcha = jest.spyOn(ReCAPTCHA, 'handleCaptcha')
    // jest.spyOn(ReCAPTCHA, 'checkForStrikes').mockImplementation(() => true)
    // spyHandleCaptcha.mockResolvedValue(true)
    // const wrapper = render(<SignIn />)
    // const { getByTestId } = wrapper
    // const button = getByTestId('submit-button')
    // expect(button).toHaveProperty('type', 'button')
    // await waitFor(() => fireEvent.click(button))
    // wrapper.debug()
    // expect(spyHandleCaptcha).toHaveBeenCalled()
  })
})
