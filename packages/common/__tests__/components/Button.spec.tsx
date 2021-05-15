import React from 'react'

import { render } from '@psdhub/test-utils'

import Button from '../../components/Button'

describe('Button renders without crashing', () => {
  it('Button matches snapshot', () => {
    const wrapper = render(<Button />)
    expect(wrapper).toMatchSnapshot()
  })
})
