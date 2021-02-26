import React from 'react'
import '@testing-library/jest-dom'

import { render } from '@hub/test-utils'

import Tooltip from '../../components/Tooltip'

describe('Tooltip renders without crashing', () => {
  const childrenValue = 'childrenValue'
  const wrapper = render(<Tooltip>{childrenValue}</Tooltip>)
  const { getByText } = wrapper

  it('Tooltip has children', () => {
    const children = getByText(childrenValue)
    expect(children).toBeInTheDocument()
  })

  it('Tooltip matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
