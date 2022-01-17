const availableProfiles = ['PROFESSOR', 'ADMINISTRADOR', ' COORDENADOR']

interface ChatbotInstance {
  profile: string
}

function initChatbot(data: ChatbotInstance): void {
  const { profile } = data

  if (!availableProfiles.includes(profile)) return

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
