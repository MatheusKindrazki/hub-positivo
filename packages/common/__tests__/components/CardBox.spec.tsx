import React from 'react'

import { render } from '@psdhub/test-utils'

import CardBox from '../../components/CardBox'

describe('CardBox renders without crashing', () => {
  const childrenValue = 'testing children'
  const wrapper = render(<CardBox>{childrenValue}</CardBox>)
  const { getByText } = wrapper

  it('CardBox has children', () => {
    const children = getByText(childrenValue)
    expect(children).toBeInTheDocument()
  })

  it('CardBox matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
