import React from 'react'

import { render } from '@hub/test-utils'

import '@testing-library/jest-dom'
import Image from '../../components/Image'

describe('Image renders without crashing', () => {
  const altText = 'alt text'
  const wrapper = render(<Image alt={altText} />)
  it('Should render image with correct alt text', () => {
    const { getByAltText } = wrapper
    const image = getByAltText(altText)

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', altText)
  })
  it('Image matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
