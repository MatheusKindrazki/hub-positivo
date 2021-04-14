import { renderHook } from '@testing-library/react-hooks'

import { Providers } from '@hub/test-utils'

import { useColorMode, useColorModeValue } from '../../layout/styles'
import { useTheme, useMediaQuery, theme } from '../../layout/'

describe('Testing chacka`s styles hooks', () => {
  it('useTheme shouldn`t return void theme when encapsulated by a theme provider', () => {
    const {
      result: { current }
    } = renderHook(() => useTheme(), {
      wrapper: Providers
    })
    expect(current).not.toBe({})
    // Blue é alterado durante a renderização do provider
    expect(current.colors.blue).not.toEqual(theme.colors.blue)
  })
  it('useColorMode should  gives you access to the current color mode, and a function to toggle the color mode.', () => {
    const {
      result: { current }
    } = renderHook(() => useColorMode(), {
      wrapper: Providers
    })

    expect(current).toHaveProperty('colorMode', 'light')
    expect(current).toHaveProperty('toggleColorMode')
    expect(current).toHaveProperty('setColorMode')
  })

  it('useColorModeValue returns current color mode: by default return light mode color', () => {
    const {
      result: { current }
    } = renderHook(() => useColorModeValue('white', 'black'), {
      wrapper: Providers
    })
    expect(current).toBe('white')
  })

  it('useMediaQuery should returns an array of booleans, indicating whether the given query matches or queries match', () => {
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: query === '(min-width: 1024)',
        addListener: jest.fn(),
        removeListener: jest.fn()
      }
    })
    const {
      result: { current }
    } = renderHook(() => useMediaQuery(['(min-width: 1024)']))
    const [isLargerThan1024] = current
    expect(isLargerThan1024).toBeTruthy()
  })
})
