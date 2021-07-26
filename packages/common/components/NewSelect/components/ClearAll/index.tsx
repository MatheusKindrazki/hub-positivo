import React, { useContext, useCallback } from 'react'

import { X } from '@psdhub/common/components/Icons'
import Box from '@psdhub/common/components/Box'

import { ContainerIcon } from './styles'
import SelectContext from '../../context'

const ClearAll: React.FC = () => {
  const context = useContext(SelectContext)

  const handleClearAll = useCallback(() => {
    context.onChange([], [])
    context.refresh()
  }, [context])

  return (
    <ContainerIcon
      active={!!context.state?.checked?.length}
      onClick={handleClearAll}
    >
      <Box as={X} size={15} color="blue.500" className="hub-select-clear" />
    </ContainerIcon>
  )
}

export default ClearAll
