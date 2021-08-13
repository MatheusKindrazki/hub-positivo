/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */

import mixpanel from 'mixpanel-browser'

import { store } from '~/store'

import { setParamsGsc } from '@psdhub/gsc'

import profiles from '~/utils/formatData/profile'
import educationalStage from '~/utils/formatData/educationalStage'

import ctpmSchools from './mock/ctpmSchools.json'

const setProperties = (): void => {
  const { info: user, school } = store.getState().user
  const educational = store.getState().educationalStage

  const schools_list = user?.schools?.map(s => s.name)

  const { activeProfiles, profile, profileNames } = profiles()

  const { activeStages, selected_educational_stage } = educationalStage()

  const first_name = user?.name?.split(' ')[0]

  const sendProps = {
    ...activeProfiles,
    ...activeStages,
    selected_class: educational.class,
    selected_educational_stage,
    is_ctpm: String(ctpmSchools.includes(school?.value || '')),

    user_id: user?.guid,
    user_login: user?.username,
    first_name,

    // ? palavra reservada mixpanel
    $name: user?.name,
    user_name: user?.name,
    user_mail: user?.email,
    email_salas: user?.email_salas,

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
  setParamsGsc(sendProps)

  try {
    mixpanel.people.set(sendProps)
    mixpanel.identify(user?.guid)
  } catch (error) {
    console.error('Erro ao identificar usuário via mixpanel')
  }
}

export default setProperties
