import { TreeNode } from '../index'

function getChecked(array: TreeNode[], prefixIgnore?: string): any {
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

function setChecked(defaultOptions: string[], array: TreeNode[]): any {
  return array.map(function iter(a) {
    if (defaultOptions.includes(a.value)) a.isChecked = 1

    Array.isArray(a.options) && a.options.map(iter)

    return a
  })
}

export { getChecked, setChecked }
