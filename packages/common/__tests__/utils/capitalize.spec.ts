import capitalize from '../../utils/capitalize'

describe('expect capitalize to work correctly', () => {
  it('should return capitalized string', () => {
    const string = 'the quick brown fox jumped over the lazy test'
    const capitalizedString = 'The quick brown fox jumped over the lazy test'
    expect(capitalize(string)).toStrictEqual(capitalizedString)
  })
})
