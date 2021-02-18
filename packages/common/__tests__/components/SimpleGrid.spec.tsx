import React from 'react'

import { render } from '@hub/test-utils'

import SimpleGrid from '../../components/SimpleGrid'

describe('SimpleGrid renders without crashing', () => {
  it('SimpleGrid matches snapshot', () => {
    const wrapper = render(<SimpleGrid />)
    expect(wrapper).toMatchSnapshot()
  })
})
