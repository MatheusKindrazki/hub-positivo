import React from 'react'

import { render } from '@psdhub/test-utils'

import FakeLoading from '~/pages/MyClasses/components/FakeLoading'

describe('FakeLoading should render properly', () => {
  it('FakeLoading matches snapshot', () => {
    const wrapper = render(<FakeLoading />)
    expect(wrapper).toMatchSnapshot()
  })
})
