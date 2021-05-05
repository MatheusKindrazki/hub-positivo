import React from 'react'

import { render } from '@psdhub/test-utils'

import Welcome, { WelcomeProps } from '../../components/Welcome'

const undefinedProps: WelcomeProps = {
  name: undefined,
  fontSize: undefined,
  avatar: undefined,
  fontWeight: undefined,
  option: undefined,
  profile: undefined,
  schoolName: undefined,
  size: undefined,
  educational_stage: undefined
}

describe('Welcome renders with correct props', () => {
  it('should render Welcome message correctly', () => {
    const { queryByText } = render(
      <Welcome
        name="Name"
        fontSize="1em"
        avatar="url"
        fontWeight="700"
        option="welcome"
        profile="Administrador"
        schoolName="Positivo"
        size="2em"
        educational_stage="educational_stage_teste"
      />
    )
    const welcomeMessage = queryByText(/Olá,/i)
    const userText = queryByText(/Name/i)
    const role = queryByText(/Administrador/i)
    const schoolName = queryByText(/Positivo/i)
    const educationalStage = queryByText(/educational_stage_teste/i)

    expect(userText).not.toBeNull()
    expect(welcomeMessage).not.toBeNull()
    expect(schoolName).not.toBeNull()
    expect(role).not.toBeNull()
    expect(educationalStage).not.toBeNull()
  })

  it('should render with welcome message despite undefined props', () => {
    const { queryByText } = render(<Welcome {...undefinedProps} />)
    const welcomeMessage = queryByText(/Olá,/i)
    const userText = queryByText(/Usuário/i)
    const role = queryByText(/Perfil/i)
    const schoolName = queryByText(/Escola/i)

    expect(userText).not.toBeNull()
    expect(welcomeMessage).not.toBeNull()
    expect(schoolName).not.toBeNull()
    expect(role).not.toBeNull()
  })

  it('should render user name as `Usuário` when option is `name` and prop name is undefined', () => {
    undefinedProps.option = 'name'
    const { queryByText } = render(<Welcome {...undefinedProps} />)

    const userText = queryByText(/Usuário/i)
    expect(userText).not.toBeNull()
  })
})
