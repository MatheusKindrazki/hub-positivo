import React from 'react'

import { render } from '@psdhub/test-utils'

import Tooltip from '../../components/Tooltip'

describe('Tooltip renders without crashing', () => {
  const childrenValue = 'childrenValue'
  const wrapper = render(<Tooltip>{childrenValue}</Tooltip>)
  const { queryByText } = wrapper

  it('Tooltip has children', () => {
    const children = queryByText(childrenValue)
    expect(children).not.toBeNull()
  })

  it('Tooltip matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
