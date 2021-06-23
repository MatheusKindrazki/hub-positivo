import { TreeNode } from '../index'
import { onChildClick, onGetPath, onSetCheckParent } from '.'

const handleClickParents = (data: TreeNode[], item?: TreeNode): void => {
  if (!item) return

  let nextStatus
  if (!item.isChecked) {
    nextStatus = 1
  } else if (item.isChecked === 1) {
    nextStatus = 0
  } else {
    nextStatus = 1
  }

  onChildClick(data, item, nextStatus)
  const path = onGetPath(data, item)
  if (path) {
    const len = path.length
    for (let i = len - 1; i >= 0; i--) {
      onSetCheckParent(data, i, path)
    }
  }
}
export default handleClickParents
