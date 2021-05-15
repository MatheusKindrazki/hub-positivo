import React from 'react'

import { render } from '@psdhub/test-utils'

import FakeLoading from '~/pages/Home/components/FakeLoading'

describe('testing fakeLoading', () => {
  it('should render without  crashing', () => {
    const wrapper = render(<FakeLoading />)
    expect(wrapper).toMatchSnapshot()
  })
})
