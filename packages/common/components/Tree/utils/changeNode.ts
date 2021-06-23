import { TreeNode } from '../index'

const changeNode = (
  nodeData: TreeNode[],
  item: TreeNode,
  state: number
): void => {
  for (let i = 0; i < nodeData.length; i++) {
    if (nodeData[i].value === item.value) {
      nodeData[i].isChecked = state
      return
    }
    if (nodeData[i].options) {
      changeNode(nodeData[i].options || [], item, state)
    }
  }
}

export default changeNode
