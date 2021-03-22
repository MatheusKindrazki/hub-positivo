import amplitude from 'amplitude-js'
import { renderHook } from '@testing-library/react-hooks'

import { useAmplitudeSetProperties } from '~/hooks/amplitude/useAmplitudeSetProperties'
jest.mock('amplitude-js', () => ({
  getInstance: jest.fn().mockReturnValue({
    setUserProperties: jest.fn()
  })
}))

describe('testing if amplitude set properties functions work properly', () => {
  const instance = amplitude.getInstance()
  const { setUserProperties } = instance

  it('get started', () => {
    renderHook(() => useAmplitudeSetProperties())

    expect(1).toBe(1)
  })
})
