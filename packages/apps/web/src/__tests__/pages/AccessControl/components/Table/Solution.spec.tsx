import React from 'react'

import { render } from '@psdhub/test-utils'

import Solution from '~/pages/AccessControl/components/Table/components/Solution'

import { imageSquare } from '~/assets'

describe('Solution AccessControl component', () => {
  it('Should render properly with file path', async () => {
    const wrapper = render(<Solution solution="Solução" file={imageSquare} />)
    expect(wrapper.queryByText('Solução')).not.toBeNull()
  })
})
