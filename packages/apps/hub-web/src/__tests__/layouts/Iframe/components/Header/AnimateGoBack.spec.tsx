import React from 'react'

import { render } from '@hub/test-utils'

import AnimateGoBack from '~/layouts/Iframe/components/Header/AnimateGoBack'

describe('getting started', () => {
  const setup = () => {
    const onClick = jest.fn()
    const wrapper = render(<AnimateGoBack onClick={onClick} />)
    return { ...wrapper, onClick }
  }
  it('it', () => {
    const { getByTestId } = setup()
  })
})
