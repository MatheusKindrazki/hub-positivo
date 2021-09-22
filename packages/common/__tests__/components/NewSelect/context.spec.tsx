import React from 'react'

import { renderHook } from '@testing-library/react-hooks'

import { act } from '@psdhub/test-utils'

import SelectProvider, {
  useSelect
} from '../../../components/NewSelect/context/index'
const mockedOnClose = jest.fn()

const Context: React.FC = ({ children }) => {
  return <SelectProvider onClose={mockedOnClose}>{children}</SelectProvider>
}

describe('newSelect context should work as expected', () => {
  it('should be defined', () => {
    const {
      result: { current: context }
    } = renderHook(() => useSelect(), { wrapper: Context })

    expect(context).toBeDefined()
  })

  it('Should throw an error when context is not provided', () => {
    jest.spyOn(React, 'useContext').mockReturnValue(undefined)

    expect(() => {
      const {
        result: { current: _ }
      } = renderHook(() => useSelect())
    }).toThrow(new Error('SelectContext not found'))

    jest.clearAllMocks()
    jest.restoreAllMocks()
  })
  it('getState should return select state', async () => {
    const {
      result: { current }
    } = renderHook(() => useSelect(), { wrapper: Context })

    let result

    act(() => {
      result = current.getState()
    })

    expect(result).toEqual({ checked: [], raw: [] })
  })

  it('getState should return select state', async () => {
    const {
      result: { current }
    } = renderHook(() => useSelect(), { wrapper: Context })

    act(() => {
      current.onChange(['1'], [{ value: '1', label: 'um' }])
    })

    let result

    act(() => {
      result = current.getState()
    })

    expect(result).toEqual({
      checked: ['1'],
      raw: [{ value: '1', label: 'um' }]
    })
  })
})
