import { store } from '~/store'

import { EEMConnectPost, EEMProps } from './eemConnect'

interface ChangeSchoolParams {
  token?: string | null
  school_id?: string | null
}

export type EEMConnectPostResponse = {
  access_token: string
  expires_in: number
  token_type: string
  refresh_token: string
  scope: string
}

export interface EEMChangeSchoolParams {
  access_token?: string
  school_id?: string
}

export interface RefreshTokenParams {
  refresh_token: string | null
}

export interface SignInParams {
  username: string
  password: string
}

interface EEMIntegrationParams {
  data?: EEMChangeSchoolParams | RefreshTokenParams | SignInParams
  grantType: EEMProps['data']['grant_type']
}

export type EEMIntegrationReturn = ReturnType<typeof eemIntegration>

export interface ConnectToEEMReturn {
  changeSchool: (
    data: EEMChangeSchoolParams
  ) => ReturnType<typeof eemIntegration>
  refreshToken: (data: RefreshTokenParams) => ReturnType<typeof eemIntegration>
  login: (data: SignInParams) => ReturnType<typeof eemIntegration>
}

const eemIntegration = async ({ data, grantType }: EEMIntegrationParams) =>
  EEMConnectPost<EEMConnectPostResponse>({
    endpoint: 'connect/token',
    data: {
      ...data,
      grant_type: grantType
    }
  })

export const connectToEEM = {
  changeSchool: async (data: EEMChangeSchoolParams): EEMIntegrationReturn =>
    eemIntegration({
      data,
      grantType: 'change_school'
    }),
  refreshToken: async (data: RefreshTokenParams): EEMIntegrationReturn =>
    eemIntegration({ data, grantType: 'refresh_token' }),
  login: async (data: SignInParams): EEMIntegrationReturn =>
    eemIntegration({ data, grantType: 'password' })
}

export type ApiChange = { access_token: string }

async function changeSchool(data?: ChangeSchoolParams): Promise<ApiChange> {
  const auth = store.getState().auth
  const { school } = store.getState().user

  const response = await EEMConnectPost({
    endpoint: 'connect/token',
    data: {
      access_token: (data?.token || auth?.token) as string,
      school_id: data?.school_id || school?.value,
      grant_type: 'change_school'
    }
  })

  return response.data as ApiChange
}

export { changeSchool }
