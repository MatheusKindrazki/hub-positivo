import React, { useContext, useCallback, memo } from 'react'

import Tree, { TreeNode } from '@psdhub/common/components/Tree'

import { ContainerOptions } from './styles'
import SelectContext from '../../../context'

const DefaultVariant: React.FC = props => {
  const context = useContext(SelectContext)

  const handleSelect = useCallback(
    (checked: string[], raw: TreeNode[]) => {
      context.onChange(checked, raw)
    },
    [context]
  )

  return (
    <ContainerOptions>
      <Tree
        {...props}
        options={context.options || []}
        defaultOptions={context?.state?.checked}
        onChange={handleSelect}
      />
    </ContainerOptions>
  )
}

export default memo(DefaultVariant)
