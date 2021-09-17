import React from 'react'

import { render } from '@testing-library/react'

import Welcome from '~/components/Welcome'

describe('Welcome component works as expected', () => {
  it('welcome text should be at the document', () => {
    const { getByText } = render(
      <Welcome fontSize="32px" option="name" fontWeight="500" name="test" />
    )

    expect(getByText('test', { exact: false })).toBeInTheDocument()
  })

  it('should render generic welcome message when no name is received', () => {
    const { getByText } = render(
      <Welcome fontSize="32px" option="name" fontWeight="500" />
    )

    expect(getByText('Usuário', { exact: false })).toBeInTheDocument()
  })

  it('should render welcome text when option is welcome', () => {
    const { getByText } = render(
      <Welcome fontSize="32px" option="welcome" fontWeight="500" />
    )

    expect(getByText('seja bem-vindo', { exact: false })).toBeInTheDocument()
  })

  it('should set generic font size and weight when none is received', () => {
    const { getByText } = render(<Welcome option="welcome" />)

    expect(getByText('seja bem-vindo', { exact: false })).toHaveStyle({
      fontSize: '1,2rem',
      fontWeight: 'normal'
    })
  })
})
