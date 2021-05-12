import { postInformations, SendInfos } from '@psdhub/helpers'

import { SignInSuccess, LoggedData } from '../@types/auth'

interface SendAllProps {
  data?: SignInSuccess
  reducedToken: string
  loggedData: LoggedData
  class?: string
}

function sendAllInfos(e: SendAllProps): void {
  console.info('@HUB: Enviando dados para a solução')

  const prepareData: SendInfos = {
    reduced_token: e.reducedToken,
    token: e.data?.token as string,
    user_info: { ...(e.data?.info as SendInfos['user_info']) },
    logged_in: {
      profile: e.loggedData.selected_profile.id,
      school: {
        class: e.class as string,
        id: e.loggedData.selected_school.id,
        name: e.loggedData.selected_school.name
      }
    }
  }

  postInformations(prepareData)
}

export { sendAllInfos }
