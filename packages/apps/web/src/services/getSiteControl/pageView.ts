const pageView = (pathname: string): void => {
  if (window.gsc) {
    window?.gsc('trackPage', pathname)
  }
}

export default pageView
