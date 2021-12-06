const availableSchools = [
  '87909a2c-7ec1-4103-bf12-83467e69fd9a',
  '57f5d301-b83b-4d49-8eed-17c55444fdd5',
  '6aaede1a-d1e4-469d-8a64-d79cfd623e2e',
  '6c8cc11f-1e60-4918-96f9-acf6afbabe32'
]

const availableProfiles = ['PROFESSOR', 'ADMINISTRADOR', 'COORDENADOR']

interface ChatbotInstance {
  school: string
  profile: string
}

function initChatbot(data: ChatbotInstance): void {
  const { profile, school } = data

  if (!availableSchools.includes(school)) return

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
