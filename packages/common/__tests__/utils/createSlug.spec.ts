import createSlug from '../../utils/createSlug'

describe('expect createSlug to work correctly', () => {
  it('should convert string into slug', () => {
    const string = 'ÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ'
    const slug = 'aaaaeeeiiioooouuuc'
    expect(createSlug(string)).toStrictEqual(slug)
  })
})
