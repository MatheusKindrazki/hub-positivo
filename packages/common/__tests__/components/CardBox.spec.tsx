import React from 'react'
import '@testing-library/jest-dom'

import { render } from '@hub/test-utils'

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
