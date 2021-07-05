import React, { useRef } from 'react'

import { useDebounce } from '@psdhub/common/hooks'
import { Box, Input } from '@psdhub/common/components'

interface ControleProps {
  searchable?: (string: string) => void
}

const Control: React.FC<ControleProps> = ({ searchable }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedValue = useDebounce(e => {
    console.log(e)
  }, 500)
  return (
    <Box>{searchable && <Input ref={inputRef} onClick={debouncedValue} />}</Box>
  )
}

export default Control
