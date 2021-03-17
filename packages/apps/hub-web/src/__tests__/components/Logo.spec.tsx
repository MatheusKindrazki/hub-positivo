import React from 'react'

import { render } from '@hub/test-utils'

import Logo from '~/components/Logo'

describe('Logo component', () => {
  it('Must render the component on screen correctly', () => {
    const wrapper = render(<Logo />)
    expect(wrapper).toMatchSnapshot()
  })
})
