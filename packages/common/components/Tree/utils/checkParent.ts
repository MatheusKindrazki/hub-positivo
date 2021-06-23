import { TreeNode } from '../index'

const onSetCheckParent = (
  data: Array<TreeNode>,
  deep: number,
  path: Array<number>
): void => {
  let head: TreeNode = {
    label: '',
    value: '',
    options: data
  }
  for (let i = 0; i < deep; i++) {
    head = head.options?.length ? head.options[path[i]] : head
  }
  let status = head?.options?.every(item => item.isChecked === 0)
  if (status) {
    head.isChecked = 0
  } else {
    status = head?.options?.every(item => item.isChecked === 1)
    if (status) {
      head.isChecked = 1
    } else {
      head.isChecked = 2
    }
  }
}

export default onSetCheckParent
