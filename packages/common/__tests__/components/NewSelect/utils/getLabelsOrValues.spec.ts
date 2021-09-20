import { getLabelsOrValues } from '../../../../components/NewSelect/utils/getLabelsOrValues'

describe('getLabelsOrValues should work as expected', () => {
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

    const expectedOutput = ['string', 'string']

    const result = await getLabelsOrValues(options)

    expect(result).toEqual(expectedOutput)
  })
})
