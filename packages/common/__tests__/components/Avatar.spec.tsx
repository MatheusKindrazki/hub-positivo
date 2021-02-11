import React from 'react'

import { render } from '@hub/test-utils'

import Avatar from '../../components/Avatar'

describe('Accordion an UnmountClosed components', () => {
  it('Accordion being rendered on canvas', () => {
    const wrapper = render(<Avatar />)
    console.log(wrapper)
    expect(wrapper).toMatchSnapshot()
  })
})
