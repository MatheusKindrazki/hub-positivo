import { useEffect, RefObject } from 'react'

type EventListener = MouseEvent | TouchEvent

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: EventListener) => void,
  option: 'click' | 'mousedown' = 'mousedown'
): void {
  useEffect(() => {
    const listener = (event: EventListener) => {
      const element = ref?.current

      if (!element || element.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener(option, listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener(option, listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler, option, ref])
}

export default useOnClickOutside
