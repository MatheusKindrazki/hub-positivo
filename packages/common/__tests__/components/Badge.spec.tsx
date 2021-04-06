import React from 'react'

import { render } from '@psdhub/test-utils'

import Badge from '../../components/Badge'

describe('Badge renders without crashing', () => {
  it('Badge matches snapshot', () => {
    const wrapper = render(<Badge />)
    expect(wrapper).toMatchSnapshot()
  })
})
