import React from 'react'

import { render } from '@psdhub/test-utils'

import Stack from '../../components/Stack'

describe('Stack renders without crashing', () => {
  it('Stack matches snapshot', () => {
    const wrapper = render(<Stack />)
    expect(wrapper).toMatchSnapshot()
  })
})
