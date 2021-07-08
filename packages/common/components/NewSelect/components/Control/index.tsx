import React, { useRef, memo, useMemo, useContext } from 'react'

import { Box } from '@psdhub/common/components'

import InputSearch, { InputHandler } from '../Input'
import SelectContext from '../../context'

interface ControleProps {
  searchable?: (string: string) => void
  focus?: boolean
  placeholder?: string
}

const Control: React.FC<ControleProps> = props => {
  const { state } = useContext(SelectContext)

  const { placeholder = 'Selecione' } = props

  const inputRef = useRef<InputHandler>(null)

  props?.focus && inputRef.current?.onFocus()

  if (!props?.focus) {
    inputRef.current?.onBlur()
    inputRef.current?.onClear()
  }

  const renderValue = useMemo(() => {
    return state?.checked?.join(',') || placeholder
  }, [state, placeholder])

  return (
    <Box className="hub-control">
      {props.searchable ? (
        <InputSearch
          ref={inputRef}
          placeholder={renderValue}
          searchable={e => console.log(e)}
        />
      ) : (
        <Box as="span">{renderValue}</Box>
      )}
    </Box>
  )
}

export default memo(Control)
