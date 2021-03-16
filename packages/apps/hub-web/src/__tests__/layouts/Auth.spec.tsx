import React from 'react'

import { store } from '~/store'

import { render } from '@hub/test-utils'

import Auth from '~/layouts/Auth'

describe('Auth`s layout should render without crashing', () => {
  it('Auth`s layout should encapsulate correctly the children', () => {
    const element = 'children'
    process.env.REACT_APP_VERSION = '1.0'
    const { getByText, debug } = render(<Auth>{element}</Auth>, {
      store,
      reducers: ['global']
    })
    const children = getByText(element)
    const version = getByText(/1.0/)

    expect(children).toBeInTheDocument()
    expect(version).toBeInTheDocument()
    debug()
  })
})
