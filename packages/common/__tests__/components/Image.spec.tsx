import React from 'react'

import { render } from '@hub/test-utils'

import '@testing-library/jest-dom'
import Image from '../../components/Image'

describe('Image renders without crashing', () => {
  it('Image matches snapshot', () => {
    const altText = 'alt text'
    const wrapper = render(<Image alt={altText} />)
    const { getByAltText } = wrapper
    const image = getByAltText(altText)

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', altText)
    expect(wrapper).toMatchSnapshot()
  })
})
