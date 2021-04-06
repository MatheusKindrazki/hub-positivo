import React from 'react'

import { render } from '@psdhub/test-utils'

import Box from '../../components/Box'

describe('Box renders without crashing', () => {
  const childrenValue = 'testing children'
  const wrapper = render(<Box>{childrenValue}</Box>)
  const { getByText } = wrapper

  it('Box has children', () => {
    const children = getByText(childrenValue)
    expect(children).toBeInTheDocument()
  })

  it('Box matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
