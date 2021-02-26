import React from 'react'

import { render } from '@hub/test-utils'

import SpinnerLoader from '../../components/SpinnerLoader'

describe('SpinnerLoader renders without crashing', () => {
  it('SpinnerLoader matches snapshot', () => {
    const wrapper = render(<SpinnerLoader />)
    expect(wrapper).toMatchSnapshot()
  })
})
