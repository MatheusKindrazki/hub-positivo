function noticeError(error: Error): void {
  window.newrelic?.noticeError(error)
}

export default noticeError
