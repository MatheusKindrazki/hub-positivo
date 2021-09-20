import handleParents from '../../../../components/NewSelect/utils/handleParents'

describe('handleParents should work as expected', () => {
  it('should return empty if no value coincides', () => {
    const data = [
      {
        label: 'string',
        value: 'string',
        isChecked: 1
      }
    ]

    const item = {
      label: 'string',
      value: 'string',
      options: [{ label: 'string', value: 'string', isChecked: 2 }],
      isChecked: 1
    }
    const expectedOutput = [] as any

    const result = handleParents(data, item, true)

    expect(result).toEqual(expectedOutput)
  })
  it('should return correct overlaped values', () => {
    const data = [
      {
        label: 'strung',
        value: 'strung',
        isChecked: 1
      }
    ]

    const item = {
      label: 'string',
      value: 'string',
      options: [{ label: 'string', value: 'string', isChecked: 2 }],
      isChecked: 1
    }
    const expectedOutput = [
      {
        isChecked: 1,
        label: 'strung',
        value: 'strung'
      },
      {
        isChecked: 1,
        label: 'string',
        options: [
          {
            isChecked: 2,
            label: 'string',
            value: 'string'
          }
        ],
        value: 'string'
      }
    ]

    const result = handleParents(data, item, true)

    expect(result).toEqual(expectedOutput)
  })
  it('should work without isMulti flag', () => {
    const data = [
      {
        label: 'strung',
        value: 'strung',
        isChecked: 1
      }
    ]

    const item = {
      label: 'string',
      value: 'string',
      options: [{ label: 'string', value: 'string', isChecked: 2 }],
      isChecked: 1
    }
    const expectedOutput = [
      {
        isChecked: 1,
        label: 'string',
        options: [
          {
            isChecked: 2,
            label: 'string',
            value: 'string'
          }
        ],
        value: 'string'
      }
    ]

    const result = handleParents(data, item)

    expect(result).toEqual(expectedOutput)
  })
})
