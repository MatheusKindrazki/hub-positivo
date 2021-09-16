import React from 'react'

import { render } from '@psdhub/test-utils'

import { Skeleton } from '~/components/MenuBar/components'

describe('Skeleton should work properly', () => {
  it('Should render the correct elements on screen', () => {
    const { queryAllByTestId } = render(<Skeleton />)

    expect(queryAllByTestId('category-skeleton').length).toEqual(5)
  })
})
