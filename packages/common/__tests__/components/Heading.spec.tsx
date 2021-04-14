import React from 'react'

import { render } from '@hub/test-utils'

import Heading from '../../components/Heading'

describe('Heading renders without crashing', () => {
  const childrenValue = 'testing children'
  const wrapper = render(<Heading>{childrenValue}</Heading>)
  const { getByText } = wrapper

  it('Heading has children', () => {
    const children = getByText(childrenValue)
    expect(children).toBeInTheDocument()
  })

  it('Heading matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
