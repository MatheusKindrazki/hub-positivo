import { TreeNode } from '../types'

const handleParents = (
  data: TreeNode[],
  item: TreeNode,
  isMulti?: boolean
): TreeNode[] => {
  if (isMulti) {
    console.log('fazer')
  }

  data = [item]

  return data
}

export default handleParents
