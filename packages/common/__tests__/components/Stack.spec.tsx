import React from 'react'

import { render } from '@hub/test-utils'

import Stack from '../../components/Stack'

describe('Stack renders without crashing', () => {
  it('Stack matches snapshot', () => {
    const wrapper = render(<Stack />)
    expect(wrapper).toMatchSnapshot()
  })
})
