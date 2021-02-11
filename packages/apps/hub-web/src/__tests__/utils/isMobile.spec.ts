import isMobile from '~/utils/isMobile'

describe('Check device origin', () => {
  it('Should return if the device is not mobile', () => {
    const mobile = isMobile.any()

    expect(mobile).toBe(false)
  })

  it('Should return if the device is  mobile', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      writable: true,
      value: 'Iphone Mobile phone'
    })

    const mobile = isMobile.any()

    expect(mobile).toBe(true)
  })
})
