import React from 'react'

import { render } from '@hub/test-utils'
import { Text } from '@hub/common/components'

describe('Teste', () => {
  it('ola mundo', async () => {
    const wrapper = render(<Text>ola mundo</Text>)

    wrapper.debug()

    expect(1 + 1).toEqual(2)
  })
})
