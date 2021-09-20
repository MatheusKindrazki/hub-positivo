import filterRecursive from '../../../../components/NewSelect/utils/searchByLabel'

describe('filterRecursive should work as expected', () => {
  it('should return filtered values', () => {
    const inputArray = [{ options: ['a', 'b', 'c'], label: 'b' }]
    const text = 'b'
    const expectedOutput = [{ label: 'b', options: ['a', 'b', 'c'] }]

    const result = filterRecursive(inputArray, text)

    expect(result).toEqual(expectedOutput)
  })
  it('should return filtered values', () => {
    const inputArray = [{ entities: [{ options: 'y', label: 'c' }], name: 'b' }]
    const text = 'c'
    const keys = { children: 'entities', principal: 'name' }

    const expectedOutput = [{ label: 'c', options: 'y' }]

    const result = filterRecursive(inputArray, text, keys)

    expect(result).toEqual(expectedOutput)
  })
  it('should return null when options is undefined', () => {
    const inputArray = [{ options: undefined, label: 'b' }]
    const text = 'd'

    const expectedOutput = [] as any

    const result = filterRecursive(inputArray, text)

    expect(result).toEqual(expectedOutput)
  })
})
