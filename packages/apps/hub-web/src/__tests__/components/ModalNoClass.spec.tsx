import React from 'react'

import { render } from '@hub/test-utils'

import ModalNoClass from '~/components/ModalNoClass'

describe('LogoOn component', () => {
  it('Must render the component on screen correctly', () => {
    const wrapper = render(<ModalNoClass />)

    wrapper.debug()

    // expect(wrapper).toMatchSnapshot()
  })
})
