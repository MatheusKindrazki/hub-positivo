import React from 'react'

import { render } from '@psdhub/test-utils'

import SimpleCard from '~/components/SimpleCard'

describe('SimpleCard should render properly', () => {
  it('Should render /title/ prop on screen', () => {
    const { queryByText } = render(<SimpleCard imageSrc="src" title="Title" />)

    expect(queryByText('Title')).toBeInTheDocument()
  })
})
