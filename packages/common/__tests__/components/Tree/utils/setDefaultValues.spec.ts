import setDefaultValues from '@psdhub/common/components/Tree/utils/setDefaultValues'

describe('setDefaultValues should work as expected', () => {
  const getParams = () => ({
    options: [
      {
        label: 'test-label',
        value: 'test-value',
        options: [
          {
            label: 'test-label',
            value: 'test-value'
          }
        ]
      }
    ],
    defaultOptions: ['test-value']
  })

  it('should set option as checked if its on default options list', () => {
    const { options, defaultOptions } = getParams()

    setDefaultValues(defaultOptions, options)

    const expectedOptions = [
      {
        isChecked: 1,
        label: 'test-label',
        options: [
          {
            label: 'test-label',
            value: 'test-value'
          }
        ],
        value: 'test-value'
      }
    ]

    expect(options).toEqual(expectedOptions)
  })

  it('shouldnt check an option if it doesnt match', () => {
    const { options } = getParams()

    setDefaultValues(['inexistent-value'], options)

    const expectedOptions = options

    expect(options).toEqual(expectedOptions)
  })

  it('Must early return if default options list is undefined', () => {
    const { options } = getParams()

    setDefaultValues(undefined, options)

    const expectedOptions = options

    expect(options).toEqual(expectedOptions)
  })

  it('shouldnt change options if its empty', () => {
    const { defaultOptions } = getParams()

    const options = undefined as any

    setDefaultValues(defaultOptions, options)

    const expectedOptions = options

    expect(options).toEqual(expectedOptions)
  })
})
