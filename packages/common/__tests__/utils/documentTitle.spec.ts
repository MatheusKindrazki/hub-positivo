import documentTitle from '../../utils/documentTitle'

describe('expect documentTitle to work correctly', () => {
  const string = 'test-title'
  it('should return documentTitle styled string', () => {
    const title = 'test-title - Hub'
    documentTitle(string)
    expect(document.title).toStrictEqual(title)
  })

  it('should return default string when theres no env title', () => {
    process.env.REACT_APP_HUB_TITLE = 'teste' as string
    const defaultTitle = 'test-title - teste'
    documentTitle(string)
    documentTitle(string)
    expect(document.title).toStrictEqual(defaultTitle)
  })
})
