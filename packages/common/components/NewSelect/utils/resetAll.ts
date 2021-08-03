import { TreeNode } from '../types'

const resetAll = (options: TreeNode[]): void => {
  options.forEach(option => {
    option.isChecked = 0

    if (option?.options?.length) {
      resetAll(option.options)
    }
  })
}
export default resetAll
