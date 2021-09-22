import React from 'react'

import { render } from '@psdhub/test-utils'

import Select from '../../../components/Select/index'

describe('select normal should work as expected', () => {
  it('should render default placeholder text', () => {
    const { getByText } = render(<Select variant="normal" />)

    const placeholderDefaultText = 'Select...'

    expect(getByText(placeholderDefaultText)).toBeInTheDocument()
  })

  it('should render divider when received', () => {
    const { getByText } = render(<Select variant="normal" divider={true} />)

    const placeholderDefaultText = 'Select...'

    expect(getByText(placeholderDefaultText)).toBeInTheDocument()
  })

  it('should display error when received', () => {
    const { getByText } = render(<Select variant="normal" error={true} />)

    const placeholderDefaultText = 'Select...'

    expect(getByText(placeholderDefaultText)).toBeInTheDocument()
  })
})
