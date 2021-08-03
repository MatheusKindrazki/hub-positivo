import React, { memo, useRef, useEffect, useCallback } from 'react'

import { useDebounce } from '@psdhub/common/hooks'

import { Input } from './styles'
interface InputProps {
  style?: any
  searchable?: (string: string) => void
  placeholder: string
}

const InputSelect: React.FC<InputProps> = props => {
  const { searchable } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedValue = useDebounce(() => {
    const value = inputRef?.current?.value || ''

    searchable && searchable(value)
  }, 400)

  const onClear = useCallback(() => {
    if (!inputRef.current) return

    inputRef.current.value = ''
  }, [])

  useEffect(() => {
    if (!inputRef.current) return

    inputRef.current.focus()

    return () => {
      onClear()
    }
  }, [onClear])

  return (
    <Input
      ref={inputRef}
      style={props?.style}
      placeholder={props.placeholder}
      onChange={debouncedValue}
    />
  )
}

export default memo(InputSelect)
