import { useRef } from 'react'

import { renderHook } from '@testing-library/react-hooks'

import useKeyPress from '../../hooks/useKeyPress'

describe('useKeyPress should work properly', () => {
  it('Should call handler function when element is not null', () => {
    const handler = jest.fn()
    const element = document.createElement('span')

    const {
      result: { current: ref }
    } = renderHook(() => useRef<HTMLElement>(element))
    const keydownEvent = new Event('keydown')

    const keypress = () => document.dispatchEvent(keydownEvent)

    renderHook(() => useKeyPress(ref, handler))

    keypress()

    expect(handler).toHaveBeenCalledWith(keydownEvent)
  })

  it('Should not call handler function when ref is null', () => {
    const handler = jest.fn()

    const touchStartEvent = new Event('touchstart')

    const touchStart = () => document.dispatchEvent(touchStartEvent)

    renderHook(() => useKeyPress(null as any, handler))

    touchStart()

    expect(handler).not.toHaveBeenCalledWith(touchStartEvent)
  })
})
