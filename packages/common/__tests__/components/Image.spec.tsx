import React from 'react'

import { render } from '@psdhub/test-utils'

import Image from '../../components/Image'

describe('Image renders without crashing', () => {
  const altText = 'alt text'
  const wrapper = render(<Image alt={altText} />)
  it('Should render image with correct alt text', () => {
    const { getByAltText } = wrapper

    expect(getByAltText(altText)).toBeInTheDocument()
  })
  it('Image matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
