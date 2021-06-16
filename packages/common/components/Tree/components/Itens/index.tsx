import React from 'react'

import { TreeNode } from '../../index'
import { Box, Stack } from '../../../index'

export interface TreeItensProps {
  parent: TreeNode
  isCollapse?: boolean
  getCheckbox(item: TreeNode): void
  getTreeWidget(options: Array<TreeNode>): React.ReactNode
}

const TreeItens: React.FC<TreeItensProps> = ({
  getTreeWidget,
  getCheckbox,
  isCollapse,
  parent
}) => {
  return (
    <>
      <Box d="flex" justifyContent="space-between" alignItems="center">
        {getCheckbox(parent)}
        {isCollapse && <Box>BRASIL</Box>}
      </Box>
      {parent.options && (
        <Stack pl={6} mt={1} spacing={1}>
          {getTreeWidget(parent.options)}
        </Stack>
      )}
    </>
  )
}

export default TreeItens
