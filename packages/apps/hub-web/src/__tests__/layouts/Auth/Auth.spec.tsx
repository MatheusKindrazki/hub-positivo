import React from 'react'

import { store } from '~/store'

import { render } from '@psdhub/test-utils'

import Auth from '~/layouts/Auth'

describe('Auth`s layout should render without crashing', () => {
  beforeAll(() => {
    process.env.REACT_APP_VERSION = '1.0'
  })
  it('Auth`s layout should encapsulate correctly the children', () => {
    const element = 'children'
    const { getByText } = render(<Auth>{element}</Auth>, {
      store,
      reducers: ['global']
    })
    const children = getByText(element)
    const version = getByText(/1.0/)

    expect(children).toBeInTheDocument()
    expect(version).toBeInTheDocument()
  })
})
