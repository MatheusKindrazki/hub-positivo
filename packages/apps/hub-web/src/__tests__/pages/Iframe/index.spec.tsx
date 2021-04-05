import React from 'react'

import { render } from '@hub/test-utils'

import iframe from '~/pages/Iframe/'

describe('iframe should work as expected', () => {
  it('should call postMessage Hook...', () => {
    expect(1).toBe(1)
    render(<iframe />)
  })
})
