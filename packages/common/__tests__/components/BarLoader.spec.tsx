import React from 'react'

import { render } from '@hub/test-utils'

import BarLoader from '../../components/BarLoader'

describe('BarLoader renders without crashing', () => {
  it('BarLoader matches snapshot', () => {
    const wrapper = render(<BarLoader />)
    expect(wrapper).toMatchSnapshot()
  })
})
