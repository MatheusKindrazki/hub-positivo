import React from 'react'

import { render } from '@psdhub/test-utils'

import LogoOn from '~/components/LogoOn'

describe('LogoOn component', () => {
  it('Must render the component on screen correctly', () => {
    const wrapper = render(<LogoOn />)
    expect(wrapper).toMatchSnapshot()
  })
})
