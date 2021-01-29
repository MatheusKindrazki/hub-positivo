import { store } from '~/store'

import { EEMConnectPost } from './eemConnect'

export type ApiChange = { access_token: string }

async function changeSchool(): Promise<ApiChange> {
  const auth = store.getState().auth
  const { school } = store.getState().user

  const response = await EEMConnectPost({
    endpoint: 'connect/token',
    data: {
      access_token: auth?.token as string,
      school_id: school?.value,
      grant_type: 'change_school'
    }
  })

  return response.data as ApiChange
}

export { changeSchool }
