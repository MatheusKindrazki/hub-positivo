import React, { memo, useRef, useEffect, useCallback } from 'react'

import { useDebounce } from '@psdhub/common/hooks'

import { Input } from './styles'
import { useSelect } from '../../context'
export interface InputProps {
  style?: any
  placeholder: string
}

const InputSelect: React.FC<InputProps> = props => {
  const context = useSelect()

  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedValue = useDebounce(d => {
    const value = d?.target?.value || inputRef?.current?.value || ''

    context.searchable(value)
  }, 400)

  // ignorando coverage de funções que não podem ser cobertas
  // na execução deste componente

  /* istanbul ignore next */
  context.onInputFocus = () => {
    inputRef.current?.focus()
  }

  /* istanbul ignore next */
  context.onInputBlur = () => {
    inputRef.current?.blur()
  }

  /* istanbul ignore next */
  const onClear = useCallback(() => {
    if (!inputRef.current) return

    inputRef.current.value = ''
  }, [])

  useEffect(() => {
    if (!inputRef.current) return

    return () => {
      onClear()
    }
  }, [onClear])

  return (
    <Input
      data-testid="search-input"
      ref={inputRef}
      style={props?.style}
      placeholder={props.placeholder}
      onChange={debouncedValue}
    />
  )
}

export default memo(InputSelect)
