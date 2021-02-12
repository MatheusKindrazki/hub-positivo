import React from 'react'
import '@testing-library/jest-dom'

import { render } from '@hub/test-utils'

import Welcome, { WelcomeProps } from '../../components/Welcome'

const undefinedProps: WelcomeProps = {
  name: undefined,
  fontSize: undefined,
  avatar: undefined,
  fontWeight: undefined,
  option: undefined,
  profile: undefined,
  schoolName: undefined,
  size: undefined
}

describe('Welcome renders with correct props', () => {
  it('should render Welcome message correctly', () => {
    const { getByText } = render(
      <Welcome
        name="Name"
        fontSize="1em"
        avatar="url"
        fontWeight="700"
        option="welcome"
        profile="Administrador"
        schoolName="Positivo"
        size="2em"
      />
    )
    const welcomeMessage = getByText(/Olá,/i)
    const userText = getByText(/Name/i)
    const role = getByText(/Administrador/i)
    const schoolName = getByText(/Positivo/i)

    expect(userText).toBeInTheDocument()
    expect(welcomeMessage).toBeInTheDocument()
    expect(schoolName).toBeInTheDocument()
    expect(role).toBeInTheDocument()
  })

  it('should render with welcome message despite undefined props', () => {
    const { getByText } = render(<Welcome {...undefinedProps} />)
    const welcomeMessage = getByText(/Olá,/i)
    const userText = getByText(/Usuário/i)
    const role = getByText(/Perfil/i)
    const schoolName = getByText(/Escola/i)

    expect(userText).toBeInTheDocument()
    expect(welcomeMessage).toBeInTheDocument()
    expect(schoolName).toBeInTheDocument()
    expect(role).toBeInTheDocument()
  })

  it('should render user name as `Usuário` when option is `name` and prop name is undefined', () => {
    undefinedProps.option = 'name'
    const { getByText } = render(<Welcome {...undefinedProps} />)

    const userText = getByText(/Usuário/i)
    expect(userText).toBeInTheDocument()
  })
})
