import React from 'react'

import { render } from '@psdhub/test-utils'

import Divider from '../../components/Divider'

describe('Divider renders without crashing', () => {
  it('Divider matches snapshot', () => {
    const wrapper = render(<Divider />)
    expect(wrapper).toMatchSnapshot()
  })
})
