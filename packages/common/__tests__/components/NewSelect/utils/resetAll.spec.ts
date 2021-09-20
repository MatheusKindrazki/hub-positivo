import resetAll from '../../../../components/NewSelect/utils/resetAll'

describe('resetAll should work as expected', () => {
  it('should return filtered values', async () => {
    const options = [
      {
        label: 'string',
        value: 'string',
        options: [
          { label: 'string', value: 'string', isChecked: 2 },
          { label: 'string', value: 'string', isChecked: 2 }
        ],
        isChecked: 1
      },
      {
        label: 'string',
        value: 'string',
        options: [
          { label: 'string', value: 'string', isChecked: 2 },
          { label: 'string', value: 'string', isChecked: 2 }
        ],
        isChecked: 1
      }
    ]

    const expectedOutput = undefined

    const result = await resetAll(options)

    expect(result).toEqual(expectedOutput)
  })
})
