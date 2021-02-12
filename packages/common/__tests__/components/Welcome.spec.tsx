import React from 'react'
import '@testing-library/jest-dom'

import { render } from '@hub/test-utils'

import Welcome, { WelcomeProps } from '../../components/Welcome'

const welcomeProps: WelcomeProps = {
  name: 'name',
  fontSize: '1em',
  avatar: 'url',
  fontWeight: '700',
  option: 'name',
  profile: 'profile',
  schoolName: 'schoolName',
  size: '2em'
}

describe('Welcome renders without crashing', () => {
  const { rerender, getByText } = render(<Welcome {...welcomeProps} />)

  it('should render "Ola, /name/ in the document', () => {
    const { name } = welcomeProps
    // rerender(<Welcome {...welcomeProps} />)
    const nodeName = getByText(name)
    expect(nodeName).toBeInTheDocument()
    expect(`Olá, ${name}`).toBeInTheDocument()
  })
})
