import checkParents from '@psdhub/common/components/Tree/utils/checkParent'

describe('checkParents should work as expected', () => {
  const mockedData = [
    {
      label: 'test-label',
      value: 'test-label'
    }
  ]
  const mockedDeep = 1
  const mockedPath = [0, 1]

  const setup = () => checkParents(mockedData, mockedDeep, mockedPath)

  it('should iterate through data and set checked items', () => {
    setup()
  })
})
