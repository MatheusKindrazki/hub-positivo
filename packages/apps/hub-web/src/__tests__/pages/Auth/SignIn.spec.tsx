import React from 'react'

import { render } from '@hub/test-utils'

const Test = () => <h1>Test</h1>

describe('test init', () => {
  it('test init', () => {
    render(<Test />)
    expect(1).toBe(1)
  })
})
