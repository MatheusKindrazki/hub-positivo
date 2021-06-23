import changeNode from './changeNode'
import { TreeNode } from '../index'

const onChildClick = (
  data: TreeNode[],
  item: TreeNode,
  state: number
): void => {
  changeNode(data, item, state)

  if (item.options) {
    item.options.forEach(child => {
      onChildClick(data, child, state)
    })
  }
}
export default onChildClick
