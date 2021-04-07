import React from 'react'

import { render } from '@psdhub/test-utils'

import Text from '../../components/Text'

describe('Text renders without crashing', () => {
  it('Text matches snapshot', () => {
    const wrapper = render(<Text />)
    expect(wrapper).toMatchSnapshot()
  })
})
