const HUB_REFRESH_KEY = '@hub-refresh-token'

function forceRefreshToken(): void {
  const forceRefreshEvent = new CustomEvent(HUB_REFRESH_KEY)

  document.dispatchEvent(forceRefreshEvent)
}

export { forceRefreshToken }
