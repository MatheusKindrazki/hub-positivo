const availableSchools = ['87909a2c-7ec1-4103-bf12-83467e69fd9a']

const availableProfiles = ['PROFESSOR', 'ADMINISTRADOR', ' COORDENADOR']

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
export { initChatbot }
