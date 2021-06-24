import { useEffect, RefObject } from 'react'

type EventListener = MouseEvent | TouchEvent

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: EventListener) => void
): void {
  useEffect(() => {
    const listener = (event: EventListener) => {
      const element = ref?.current

      if (!element || element.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler, ref])
}

export default useOnClickOutside
