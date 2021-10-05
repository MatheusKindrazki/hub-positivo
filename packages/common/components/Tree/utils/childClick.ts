import changeNode from './changeNode'
import { TreeNode } from '../index'

const childClick = (data: TreeNode[], item: TreeNode, state: number): void => {
  changeNode(data, item, state)

  if (item.options) {
    item.options.forEach(child => {
      childClick(data, child, state)
    })
  }
}
export default childClick
