import setGSCOnSubmit from '~/services/getSiteControl/gscOnSubmit'

describe('setGSCOnSubmit should work properly', () => {
  it('should set onsubmit function', () => {
    window.gsc = jest.fn().mockImplementation(() => {
      return 'teste'
    })
    const gscSpy = jest.spyOn(window, 'gsc')
    setGSCOnSubmit()
    expect(gscSpy).toHaveBeenCalledWith('onSubmit', expect.anything())
  })

  it('should log an error when gsc cant set onsubmit function', () => {
    window.gsc = jest.fn().mockReturnValue(new Error())
    const errorSpy = jest.spyOn(console, 'error')
    setGSCOnSubmit()
    expect(errorSpy).toHaveBeenCalledWith(
      'Erro ao capturar submissao do widget do gsc no mixpanel'
    )
  })
})
