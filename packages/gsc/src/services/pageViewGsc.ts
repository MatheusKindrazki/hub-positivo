function gscSetPageView(pathname: string): void {
  if (window.gsc) {
    console.log('GSC: Track', pathname)
    window?.gsc('trackPage', pathname)
  }
}

export default gscSetPageView
