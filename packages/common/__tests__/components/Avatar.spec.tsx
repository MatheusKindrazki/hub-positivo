import React from 'react'

import { render } from '@hub/test-utils'

import Avatar from '../../components/Avatar'

describe('Avatar renders without crashing', () => {
  it('Avatar matches snapshot', () => {
    const wrapper = render(<Avatar />)
    expect(wrapper).toMatchSnapshot()
  })
})
