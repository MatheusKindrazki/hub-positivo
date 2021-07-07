import React, {
  memo,
  useRef,
  forwardRef,
  ChangeEvent,
  useCallback,
  useImperativeHandle
} from 'react'

import { useDebounce } from '@psdhub/common/hooks'
import { Input } from '@psdhub/common/components'

export interface InputHandler {
  onClear: () => void
  onFocus: () => void
  onBlur: () => void
}

interface InputProps {
  searchable?: (string: string) => void
}

const InputSelect = forwardRef<InputHandler, InputProps>((props, ref) => {
  const { searchable } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedValue = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    searchable && searchable(e.target.value)
  }, 700)

  const onClear = useCallback(() => {
    if (!inputRef.current) return

    inputRef.current.value = ''
  }, [])

  useImperativeHandle(ref, () => ({
    onClear,
    onFocus: () => {
      inputRef.current?.focus()
    },
    onBlur: () => {
      inputRef.current?.blur()
    }
  }))

  return <Input ref={inputRef} onChange={debouncedValue} />
})

export default memo(InputSelect)
