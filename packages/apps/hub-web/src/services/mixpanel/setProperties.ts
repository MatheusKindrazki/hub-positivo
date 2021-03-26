import mixpanel from 'mixpanel-browser'

import { store } from '~/store'

import profiles from '~/utils/formatData/profile'
import educationalStage from '~/utils/formatData/educationalStage'

const setUserProperties = (): void => {
  const { info: user, school } = store.getState().user

  const schools_list = user?.schools?.map(s => s.name)

  const { activeProfiles, profile, profileNames } = profiles()

  const {
    activeStages,
    selected_class,
    selected_educational_stage
  } = educationalStage()

  const sendProps = {
    ...activeProfiles,
    ...activeStages,
    selected_class,
    selected_educational_stage,

    user_id: user?.guid,
    user_login: user?.username,
    name: user?.name,
    user_name: user?.name,
    user_mail: user?.email,

    selected_role: profile.name,
    roles_list: profileNames,
    selected_school_id: school?.value,
    selected_school_name: school?.label,
    schools_list
  }

  const { signed } = store.getState().auth

  if (!signed) return

  try {
    mixpanel.people.set(sendProps)
    mixpanel.identify(user?.guid)
  } catch (error) {
    console.error('Erro ao identificar usuário via mixpanel')
  }
}

export default setUserProperties
