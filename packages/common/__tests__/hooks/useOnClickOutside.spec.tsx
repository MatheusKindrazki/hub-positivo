import { useRef } from 'react'

import { renderHook } from '@testing-library/react-hooks'

import useOnClickOutside from '../../../common/hooks/useOnClickOutside'

describe('useOnClickOutside should work properly', () => {
  it('Should call handler function when element is not null', () => {
    const handler = jest.fn()
    const element = document.createElement('span')

    const {
      result: { current: ref }
    } = renderHook(() => useRef<HTMLElement>(element))
    const mouseDownEvent = new Event('mousedown')

    const mouseDown = () => document.dispatchEvent(mouseDownEvent)

    renderHook(() => useOnClickOutside(ref, handler))

    mouseDown()

    expect(handler).toHaveBeenCalledWith(mouseDownEvent)
  })

  it('Should not call handler function when ref is null', () => {
    const handler = jest.fn()

    const touchStartEvent = new Event('touchstart')

    const touchStart = () => document.dispatchEvent(touchStartEvent)

    renderHook(() => useOnClickOutside(null as any, handler))

    touchStart()

    expect(handler).not.toHaveBeenCalledWith(touchStartEvent)
  })
})
