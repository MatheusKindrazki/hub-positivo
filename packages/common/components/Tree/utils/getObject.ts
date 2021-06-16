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

function setChecked(defaultOptions: string[], array: any[]): any {
  const options: any = []
  array.some(function iter(a) {
    if (defaultOptions.includes(a.value)) a.isChecked = 1

    return a
  })

  console.log(options)

  return []
}

export { getChecked, setChecked }
