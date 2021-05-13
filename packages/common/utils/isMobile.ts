const isMobile = {
  Android: (): boolean => !!navigator.userAgent.match(/Android/i),
  BlackBerry: (): boolean => !!navigator.userAgent.match(/BlackBerry/i),
  iOS: (): boolean => !!navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: (): boolean => !!navigator.userAgent.match(/Opera Mini/i),
  Windows: (): boolean => {
    return (
      !!navigator.userAgent.match(/IEMobile/i) ||
      !!navigator.userAgent.match(/WPDesktop/i)
    )
  },
  any: (): boolean => {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    )
  }
}

export default isMobile
