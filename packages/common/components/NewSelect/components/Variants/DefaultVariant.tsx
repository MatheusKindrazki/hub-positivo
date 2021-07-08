import React, { useContext, useCallback, memo } from 'react'

import Tree, { TreeNode } from '@psdhub/common/components/Tree'

import SelectContext from '../../context'

interface Props {
  className?: string
}

const DefaultVariant: React.FC<Props> = props => {
  const context = useContext(SelectContext)

  const handleSelect = useCallback(
    (checked: string[], raw: TreeNode[]) => {
      context.onClose()

      context.onChange(checked, raw)
    },
    [context]
  )

  return (
    <Tree
      {...props}
      options={context.options || []}
      defaultOptions={context?.state?.checked}
      onChange={handleSelect}
    />
  )
}

export default memo(DefaultVariant)
