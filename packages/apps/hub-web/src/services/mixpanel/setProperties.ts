/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */

import mixpanel from 'mixpanel-browser'

import { store } from '~/store'

import profiles from '~/utils/formatData/profile'
import educationalStage from '~/utils/formatData/educationalStage'

const setProperties = (): void => {
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
    // ? palavra reservada mixpanel
    $name: user?.name,
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

  // Identificador new relic
  window.newrelic?.setCustomAttribute('role', sendProps.selected_role)
  window.newrelic?.setCustomAttribute('user_id', sendProps.user_id as string)
  window.newrelic?.setCustomAttribute(
    'school',
    sendProps.selected_school_id as string
  )
  window.newrelic?.setCustomAttribute(
    'user_name',
    sendProps.user_name as string
  )

  // Identificador Get Site Control
  if (window.gsc) {
    window?.gsc('params', {
      name: sendProps.user_name as string,
      role: sendProps.selected_role,
      user_id: sendProps.user_id,
      school: sendProps.selected_school_name,
      educationalStage: sendProps.selected_educational_stage
    })
  }

  try {
    mixpanel.people.set(sendProps)
    mixpanel.identify(user?.guid)
  } catch (error) {
    console.error('Erro ao identificar usuário via mixpanel')
  }
}

export default setProperties
