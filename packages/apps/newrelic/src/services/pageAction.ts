function pageAction<T = unknown>(action: string, data: T): void {
  window.newrelic?.addPageAction(action, data as any)
}

export default pageAction
