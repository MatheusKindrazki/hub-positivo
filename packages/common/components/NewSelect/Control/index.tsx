import React, { useRef, memo } from 'react'

import { Box } from '@psdhub/common/components'

import InputSearch, { InputHandler } from '../Input'
interface ControleProps {
  searchable?: (string: string) => void
  focus?: boolean
  placeholder?: string
}

const Control: React.FC<ControleProps> = props => {
  const { placeholder = 'Selecione' } = props

  const inputRef = useRef<InputHandler>(null)

  props?.focus && inputRef.current?.onFocus()

  if (!props?.focus) {
    inputRef.current?.onBlur()
    inputRef.current?.onClear()
  }

  return (
    <Box class="hub-control">
      {props.searchable ? (
        <InputSearch
          ref={inputRef}
          placeholder={placeholder}
          searchable={e => console.log(e)}
        />
      ) : (
        <Box as="span">{placeholder}</Box>
      )}
    </Box>
  )
}

export default memo(Control)
