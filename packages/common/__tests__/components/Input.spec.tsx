import React from 'react'

import { render } from '@hub/test-utils'

import Input from '../../components/Input'

describe('Input renders without crashing', () => {
  it('Input matches snapshot', () => {
    const wrapper = render(<Input />)
    expect(wrapper).toMatchSnapshot()
  })
})
