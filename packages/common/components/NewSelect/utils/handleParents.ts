import { TreeNode } from '../types'

const handleParents = (
  data: TreeNode[],
  item: TreeNode,
  isMulti?: boolean
): TreeNode[] => {
  if (isMulti) {
    const index = data.findIndex(i => i.value === item.value)

    if (index !== -1) {
      const selectedItemsCopy = [...data]

      selectedItemsCopy.splice(index, 1)

      return selectedItemsCopy
    } else {
      return [...data, item]
    }
  }

  data = [item]

  return data
}

export default handleParents
