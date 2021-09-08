import React from 'react'

import { render } from '@psdhub/test-utils'

import Loading from '~/pages/Solutions/components/Loading/index'

describe('iframe loading should work as expected', () => {
  it('loader should work when loading is true', () => {
    const wrapper = render(<Loading loading={true} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('loader should work when loading is false', () => {
    const wrapper = render(<Loading loading={false} />)
    expect(wrapper).toMatchSnapshot()
  })
})
