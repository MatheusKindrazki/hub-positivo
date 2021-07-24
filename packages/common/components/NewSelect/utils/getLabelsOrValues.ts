import { TreeNode } from '../types'

function getLabelsOrValues(
  array: TreeNode[],
  type?: 'label' | 'value',
  prefixIgnore?: string
): any {
  const values: string[] = []

  const returnType = type || 'value'

  array.some(function iter(a) {
    const conditional = prefixIgnore ? !a.value.includes(prefixIgnore) : true

    if (a.isChecked === 1 && conditional) {
      values.push(a[returnType])
    }

    return Array.isArray(a.options) && a.options.some(iter)
  })

  return values
}

export { getLabelsOrValues }
