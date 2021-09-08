// import setGSCOnSubmit from '~/services/getSiteControl/gscOnSubmit'
export {}

describe.skip('setGSCOnSubmit should work properly', () => {
  afterEach(jest.clearAllMocks)

  window.gsc = jest.fn()
  const gscSpy = jest.spyOn(window, 'gsc')

  it('should set onsubmit function', () => {
    // setGSCOnSubmit()
    expect(gscSpy).toHaveBeenCalledWith('onSubmit', expect.anything())
  })

  it('should do nothing if window.gsc is undefined', () => {
    window.gsc = undefined
    // setGSCOnSubmit()
    expect(gscSpy).not.toHaveBeenCalled()
  })
})
