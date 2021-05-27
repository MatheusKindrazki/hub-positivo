import React from 'react'

import { render } from '@psdhub/test-utils'

import Solution from '~/pages/AccessControl/components/Table/components/Solution'

describe('Solution AccessControl component', () => {
  it('Should render properly with file path', async () => {
    const wrapper = render(<Solution solution="Solução" file="file" />)
    expect(wrapper.queryByText('Solução')).not.toBeNull()
  })

  it('Should render properly without file path', async () => {
    const wrapper = render(<Solution solution="Solução" file={null as any} />)
    expect(wrapper.queryByText('Solução')).not.toBeNull()
  })
})
