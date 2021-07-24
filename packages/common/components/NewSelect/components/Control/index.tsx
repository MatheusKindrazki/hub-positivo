import React, { useRef, useMemo, useContext } from 'react'

import { Box } from '@psdhub/common/components'

import InputSearch, { InputHandler } from '../Input'
import Badges from '../Badges'
import SelectContext from '../../context'

interface ControleProps {
  searchable?: (string: string) => void
  focus?: boolean
  placeholder?: string
}

const Control: React.FC<ControleProps> = props => {
  const { state, isBadge } = useContext(SelectContext)

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

  const renderComponent = useMemo(() => {
    if (!isBadge && !props.searchable) {
      return <Box as="span">{renderValue}</Box>
    }

    if (props.focus) {
      return (
        <InputSearch
          ref={inputRef}
          placeholder={renderValue}
          searchable={e => console.log(e)}
        />
      )
    }

    if (!state?.checked?.length) {
      return <Box as="span">{renderValue}</Box>
    }

    return <Badges itens={state?.checked} />
  }, [isBadge, props.focus, props.searchable, renderValue, state?.checked])

  return <Box className="hub-control">{renderComponent}</Box>
}

export default Control
