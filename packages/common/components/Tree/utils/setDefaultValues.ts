import { TreeNode } from '../index'
import { handleClickParents } from '.'

const setDefaultValues = (
  defaultOptions?: string[],
  options?: TreeNode[]
): void => {
  if (!defaultOptions?.length) return

  defaultOptions?.map(value => {
    let item = {} as TreeNode

    options?.some(function iter(option) {
      if (option.value.includes(value)) {
        item = option
      }

      Array.isArray(option.options) && option.options.some(iter)
    })
    handleClickParents(options || [], item)
  })
}
export default setDefaultValues
