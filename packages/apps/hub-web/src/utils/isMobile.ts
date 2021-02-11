const mobile = {
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
      mobile.Android() ||
      mobile.BlackBerry() ||
      mobile.iOS() ||
      mobile.Opera() ||
      mobile.Windows()
    )
  }
}

export default mobile
