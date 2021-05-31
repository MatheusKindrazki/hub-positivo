import React from 'react'

import { render } from '@psdhub/test-utils'

import GrabIcon from '~/components/GrabIcon'

describe('GrabIcon component', () => {
  it('Must render the component on screen correctly', () => {
    const wrapper = render(<GrabIcon />)
    expect(wrapper).toMatchSnapshot()
  })
})
