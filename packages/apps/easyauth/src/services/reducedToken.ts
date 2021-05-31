import { EEMConnectPost } from './eemConnect'

export type ApiChange = { access_token: string }

interface ChangeSchoolParams {
  token: string
  school_id: string
}

async function getReducedToken(data: ChangeSchoolParams): Promise<ApiChange> {
  const response = (await EEMConnectPost({
    endpoint: 'connect/token',
    data: {
      access_token: data.token,
      school_id: data.school_id,
      grant_type: 'change_school'
    }
  })) as { data: ApiChange; ok: boolean }

  if (!response.ok) {
    throw new Error('Ocorreu um erro ao buscar o token reduzido!')
  }

  return response.data
}

export default getReducedToken
