import React from 'react'

import { render } from '@hub/test-utils'

import Flex from '../../components/Flex'

describe('Flex renders without crashing', () => {
  const childrenValue = 'testing children'
  const wrapper = render(<Flex children={childrenValue} />)
  const { queryByText } = wrapper
  it('Flex has children', () => {
    const children = queryByText(childrenValue)
    expect(children).not.toBeNull()
  })
  it('Flex matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
