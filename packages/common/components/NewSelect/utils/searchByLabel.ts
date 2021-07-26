// You must filter the array of options through the typed text recursively.

function filterRecursive<T>(
  array: T[],
  text: string,
  keys?: { children: string; principal: string }
): T[] {
  const childrenKey = keys?.children || 'options'
  const principalKey = keys?.principal || 'label'

  let filtered: T[] = []

  const data = array as any

  data.forEach(function (item: T) {
    const rewriteItem = item as any
    if (
      rewriteItem[principalKey].toLowerCase().indexOf(text.toLowerCase()) !== -1
    ) {
      filtered.push(rewriteItem)
    } else if (rewriteItem[childrenKey]) {
      filtered = filtered.concat(
        filterRecursive(rewriteItem[childrenKey], text)
      )
    }
  })

  return filtered as T[]
}

export default filterRecursive
