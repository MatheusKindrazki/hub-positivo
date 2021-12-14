import { getInformations, SendInfos, PostFnProps } from '@psdhub/helpers'
import createColors from '@psdhub/common/layout/styles/colors'

import { mockLevels } from '../components/Header'
import { SignInSuccess, LoggedData } from '../@types/auth'

interface SendAllProps {
  level?: string
  data?: SignInSuccess
  reducedToken: string
  loggedData: LoggedData
  class?: string
}

function useSendAllInfos(e: SendAllProps): void {
  const profile = e?.loggedData?.selected_profile?.colorProfile as any

  const colors = createColors({ profile })

  const observable = getInformations as PostFnProps

  const prepareData: SendInfos = {
    reduced_token: e.reducedToken,
    token: e.data?.token as string,
    user_info: {
      ...(e.data?.info as SendInfos['user_info']),
      guid: (e.data?.info as any)?.sub
    },
    logged_in: {
      profile: e.loggedData.selected_profile.id as string,
      profileTheme: profile,
      school: {
        class: e.class as string,
        id: e.loggedData.selected_school.id,
        name: e.loggedData.selected_school.name
      },
      educationalStage: {
        selected: e.level as string,
        options: mockLevels
      }
    },
    primary_color: colors.blue
  }

  // console.info(prepareData)

  observable.publish(prepareData)
}

export { useSendAllInfos as sendAllInfos }
