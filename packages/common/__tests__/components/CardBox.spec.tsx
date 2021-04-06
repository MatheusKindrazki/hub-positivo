import React from 'react'

import { render } from '@hub/test-utils'

import CardBox from '../../components/CardBox'

describe('CardBox renders without crashing', () => {
  const childrenValue = 'testing children'
  const wrapper = render(<CardBox>{childrenValue}</CardBox>)
  const { queryByText } = wrapper

  it('CardBox has children', () => {
    const children = queryByText(childrenValue)
    expect(children).not.toBeNull()
  })

  it('CardBox matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
