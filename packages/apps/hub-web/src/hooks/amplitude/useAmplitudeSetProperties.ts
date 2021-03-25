import { useCallback, useEffect, useMemo } from 'react'

import amplitude from 'amplitude-js'

import { useSelector } from 'react-redux'

import {
  AmplitudeEducationalStageProps,
  School,
  AmplitudeProps,
  User
} from './types'

export const useAmplitudeSetProperties = (): void => {
  /* istanbul ignore next */
  const { info: user, school } = useSelector((state: Store.State) => state.user)
  const { profiles, name: selectedRole } = useSelector(
    /* istanbul ignore next */
    (state: Store.State) => state.profile
  )
  const { levels, class: selected_class, level } = useSelector(
    /* istanbul ignore next */
    (state: Store.State) => state.educationalStage
  )

  const { guid, username, name, schools } = user as User
  const {
    value: selected_school_id,
    label: selected_school_name
  } = school as School

  const formatedRoles = profiles?.map(role => role.name)
  const booleanRoles = useCallback(() => {
    const booleanStages = {
      is_teacher: formatedRoles?.includes('Professor'),
      is_student: formatedRoles?.includes('Aluno'),
      is_coordinator: formatedRoles?.includes('Coordenador'),
      is_admin: formatedRoles?.includes('Administrador'),
      is_family: formatedRoles?.includes('Família')
    }
    return booleanStages
  }, [formatedRoles])

  const formatedEducationalStages = levels?.map(level => level.value)
  const booleanEducationalStages = useCallback(() => {
    const booleanStages: AmplitudeEducationalStageProps = {
      educational_stage_EI: formatedEducationalStages?.includes('EI'),
      educational_stage_EF1: formatedEducationalStages?.includes('EF1'),
      educational_stage_EF2: formatedEducationalStages?.includes('EF2'),
      educational_stage_EM: formatedEducationalStages?.includes('EM')
    }
    return booleanStages
  }, [formatedEducationalStages])

  const formatSchoolsList = schools?.map((school: any) => school.name)

  const eventProperties: AmplitudeProps = useMemo(() => {
    const props = {
      user_id: guid,
      user_login: username,
      user_name: name,
      selectedRole,
      roles_list: formatedRoles,
      ...booleanRoles(),
      selected_school_id,
      selected_school_name,
      selected_school_sge: null,
      schools_list: formatSchoolsList,
      selected_class,
      selected_educational_stage: level,
      ...booleanEducationalStages()
    }
    return props
  }, [
    guid,
    username,
    name,
    selectedRole,
    formatedRoles,
    booleanRoles,
    selected_school_id,
    selected_school_name,
    formatSchoolsList,
    selected_class,
    level,
    booleanEducationalStages
  ])

  useEffect(() => {
    amplitude.getInstance().setUserProperties(eventProperties)
  }, [eventProperties, guid])
}
