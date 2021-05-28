import React from 'react'

import { render } from '@psdhub/test-utils'
import { Switch } from '@psdhub/common/components'

describe('Switch renders without crashing', () => {
  it('Should match snapshot', () => {
    const wrapper = render(<Switch />)
    expect(wrapper).toMatchSnapshot()
  })
})
