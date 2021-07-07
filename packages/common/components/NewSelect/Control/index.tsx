import React, { useRef, memo } from 'react'

import { Box } from '@psdhub/common/components'

import InputSearch, { InputHandler } from '../Input'
interface ControleProps {
  searchable?: (string: string) => void
  focus?: boolean
}

const Control: React.FC<ControleProps> = props => {
  const inputRef = useRef<InputHandler>(null)

  props?.focus && inputRef.current?.onFocus()

  if (!props?.focus) {
    inputRef.current?.onBlur()
    inputRef.current?.onClear()
  }

  return (
    <Box class="hub-control">
      <Box>
        <InputSearch ref={inputRef} searchable={e => console.log(e)} />
      </Box>
    </Box>
  )
}

export default memo(Control)
