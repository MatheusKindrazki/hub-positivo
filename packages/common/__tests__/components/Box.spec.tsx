import React from 'react'

import { render } from '@hub/test-utils'

import Box from '../../components/Box'

describe('Box renders without crashing', () => {
  const childrenValue = 'testing children'
  const wrapper = render(<Box>{childrenValue}</Box>)
  const { queryByText } = wrapper

  it('Box has children', () => {
    const children = queryByText(childrenValue)
    expect(children).not.toBeNull()
  })

  it('Box matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
