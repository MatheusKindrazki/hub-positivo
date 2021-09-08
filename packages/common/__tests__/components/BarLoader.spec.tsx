import React from 'react'

import { render } from '@psdhub/test-utils'

import BarLoader from '../../components/BarLoader'

describe('BarLoader renders without crashing', () => {
  it('BarLoader matches snapshot with non-required props', () => {
    const wrapper = render(
      <BarLoader loading={true} height="0.25rem" color="red" />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('BarLoader matches snapshot without non-required props', () => {
    const wrapper = render(<BarLoader loading={true} height="0.25rem" />)
    expect(wrapper).toMatchSnapshot()
  })
})
