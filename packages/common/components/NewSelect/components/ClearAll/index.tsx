import React, { useContext, useCallback } from 'react'

import { X } from '@psdhub/common/components/Icons'

import { ContainerIcon } from './styles'
import SelectContext from '../../context'

const ClearAll: React.FC = () => {
  const context = useContext(SelectContext)

  const handleClearAll = useCallback(() => {
    context.onChange([], [])
  }, [context])

  return (
    <ContainerIcon
      active={!!context.state?.checked?.length}
      role="button"
      as={X}
      size={15}
      color="blue.500"
      onClick={handleClearAll}
      className="hub-select-clear"
    ></ContainerIcon>
  )
}

export default ClearAll
