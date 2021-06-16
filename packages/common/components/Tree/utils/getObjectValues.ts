import { TreeNode } from '../index'

function getObjectValues(array: TreeNode[], prefixIgnore?: string): any {
  const values: string[] = []

  array.some(function iter(a) {
    const conditional = prefixIgnore ? !a.value.includes(prefixIgnore) : true

    if (a.isChecked === 1 && conditional) {
      values.push(a.value)
    }

    return Array.isArray(a.options) && a.options.some(iter)
  })

  return values
}

export default getObjectValues
