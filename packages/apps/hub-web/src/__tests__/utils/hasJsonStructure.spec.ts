import hasJsonStructure from '~/utils/hasJsonStructure'

describe('json-type structure', () => {
  it('Should be check if string has a json structure', () => {
    const hasJSON = JSON.stringify({
      id: 1,
      name: 'teste-json'
    })

    expect(hasJsonStructure(hasJSON)).toBe(true)
  })

  it('Must return that the structure sent is not of the JSON type', () => {
    const notJSON = '{json:not}'
    const array = '[]'

    expect(hasJsonStructure(notJSON)).toBe(false)
    expect(hasJsonStructure(array)).toBe(true)
    expect(hasJsonStructure()).toBe(false)
  })
})
