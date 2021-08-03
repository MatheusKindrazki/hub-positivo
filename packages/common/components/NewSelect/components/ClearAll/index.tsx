import React, { useCallback } from 'react'

import { X } from '@psdhub/common/components/Icons'
import Box from '@psdhub/common/components/Box'

import { ContainerIcon } from './styles'
import { resetAll } from '../../utils'
import { useSelect } from '../../context'

const ClearAll: React.FC = () => {
  const context = useSelect()

  const handleClearAll = useCallback(() => {
    context.setState({
      checked: [],
      raw: []
    })

    resetAll(context.options)

    context.refresh()
  }, [context])

  return (
    <ContainerIcon
      active={!!context.getState().checked.length}
      onClick={handleClearAll}
    >
      <Box as={X} size={15} color="blue.500" className="hub-select-clear" />
    </ContainerIcon>
  )
}

export default ClearAll
