import React from 'react'

import { render } from '@psdhub/test-utils'

import Heading from '../../components/Heading'

describe('Heading renders without crashing', () => {
  const childrenValue = 'testing children'
  const wrapper = render(<Heading>{childrenValue}</Heading>)
  const { queryByText } = wrapper

  it('Heading has children', () => {
    const children = queryByText(childrenValue)
    expect(children).not.toBeNull()
  })

  it('Heading matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
