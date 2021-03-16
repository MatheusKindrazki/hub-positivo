import React from 'react'

import { render } from '@hub/test-utils'

import Auth from '~/layouts/Auth'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => ({ loading: false }))
}))

describe('Auth`s layout should render without crashing', () => {
  it('Auth`s layout should encapsulate correctly the children', () => {
    const element = 'children'
    const { getByText, debug } = render(<Auth>{element}</Auth>)
    const children = getByText(element)

    expect(children).toBeInTheDocument()
    debug()
  })
})
