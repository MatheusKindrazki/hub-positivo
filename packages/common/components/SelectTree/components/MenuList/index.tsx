import React from 'react'

import { MenuListProps } from './types'
import Tree, { TreeNode } from '../../../Tree'
import { Box } from '../../../'

const MenuList: MenuListProps = props => {
  console.log(props.options)

  return (
    <Box px="3">
      <Tree {...props} options={props.options as TreeNode[]} />
      {/* <Box>{props.children}</Box> */}
    </Box>
  )
}

export default MenuList
