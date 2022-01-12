function initChatbot(): void {
  require('../scripts/zoho')
}

declare global {
  interface Window {
    $zoho: any
  }
}

function removeChatbot(): void {
  window.$zoho = undefined

  const zoho = document.getElementById('zsiqscript')

  zoho?.remove()
}
export { initChatbot, removeChatbot }
