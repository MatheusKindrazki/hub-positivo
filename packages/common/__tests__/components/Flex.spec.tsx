import React from 'react'

import { render } from '@psdhub/test-utils'

import Flex from '../../components/Flex'

describe('Flex renders without crashing', () => {
  const childrenValue = 'testing children'
  const wrapper = render(<Flex children={childrenValue} />)
  const { getByText } = wrapper
  it('Flex has children', () => {
    const children = getByText(childrenValue)
    expect(children).toBeInTheDocument()
  })
  it('Flex matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
