import React from 'react'

import ExpiredToken from '~/pages/Auth/ExpiredToken'

import { renderWithContext } from '~/hub-test-utils'

describe('Expired Token page should work properly', () => {
  it('debug', () => {
    const wrapper = renderWithContext(<ExpiredToken />)
    wrapper.debug()
  })
})
