import { truncateString } from '../../utils/truncateString'

describe('truncateString should work as expected', () => {
  it('should return truncated string', () => {
    const string = 'this phrase is longer than the limit'
    const limit = 11
    const expectedResult = 'this phrase...'
    const result = truncateString(string, limit)
    expect(result).toEqual(expectedResult)
  })
  it('should return whole string when limit is higher', () => {
    const string = 'short string'
    const limit = 12
    const result = truncateString(string, limit)
    expect(result).toEqual(string)
  })
})
