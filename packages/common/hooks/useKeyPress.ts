import { useEffect, RefObject } from 'react'

type EventListener = KeyboardEvent

function useKeyPress<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: EventListener) => void
): void {
  useEffect(() => {
    const listener = (event: EventListener) => {
      handler(event)
    }

    document.addEventListener('keydown', listener)

    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [handler, ref])
}

export default useKeyPress
