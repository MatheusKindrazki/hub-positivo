import mixpanel from 'mixpanel-browser'

import { store } from '~/store'

import {
  activeProfiles,
  profile,
  profileNames
} from '~/utils/formatData/profile'
import {
  activeStages,
  selected_class,
  selected_educational_stage
} from '~/utils/formatData/educationalStage'

const { user, school } = store.getState().user

const schools_list = user?.schools?.map(s => s.name)

const sendProps = {
  ...activeProfiles,
  ...activeStages,
  selected_class,
  selected_educational_stage,

  user_id: user?.guid,
  user_login: user?.username,
  user_name: user?.name,
  user_mail: user?.email,

  selected_role: profile.name,
  roles_list: profileNames,
  selected_school_id: school?.value,
  selected_school_name: school?.label,
  schools_list
}

const setUserProperties = (): void => {
  const { signed } = store.getState().auth

  if (!signed) return

  try {
    mixpanel?.people?.set(sendProps)
  } catch (error) {
    console.log('Erro ao identificar usuário via mixpanel')
  }
}

export default setUserProperties
