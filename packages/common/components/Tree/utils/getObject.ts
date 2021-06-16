import { TreeNode } from '../index'

function getChecked(array: TreeNode[], prefixIgnore?: string): any {
  const values: string[] = []

  array.some(function iter(a) {
    if (a.isChecked === 1 && !a.value.includes(prefixIgnore || '')) {
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
