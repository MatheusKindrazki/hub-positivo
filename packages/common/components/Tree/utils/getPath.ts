import { TreeNode } from '../index'

const onGetPath = (data: Array<TreeNode>, item: TreeNode): any => {
  let i
  for (i = 0; i < data.length; i++) {
    if (data[i].value === item.value) {
      return [i]
    }
    if (data[i].options) {
      const res: any = onGetPath(data[i].options || [], item)
      if (res) {
        return [i, ...res]
      }
    }
  }
  return null
}
export default onGetPath
