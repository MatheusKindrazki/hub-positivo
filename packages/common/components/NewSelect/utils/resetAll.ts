import { TreeNode } from '../types'

const resetAll = (options: TreeNode[]): Promise<void> => {
  let count = 0
  return new Promise(resolve => {
    options.forEach(async option => {
      count++
      option.isChecked = 0

      if (option?.options?.length) {
        await resetAll(option.options)
      }

      if (count === options.length) {
        resolve()
      }
    })
  })
}
export default resetAll
