import { TreeNode } from '../index'

const changeNode = (
  nodeData: TreeNode[],
  item: TreeNode,
  state: number
): void => {
  for (const node of nodeData) {
    if (node.value === item.value) {
      node.isChecked = state
      return
    }
    if (node.options) {
      changeNode(node.options || [], item, state)
    }
  }
}

export default changeNode
