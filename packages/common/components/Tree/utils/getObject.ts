function getChecked(array: any[]): any {
  const values: any[] = []

  array.some(function iter(a) {
    if (a.isChecked === 1) values.push(a.value)

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
