import { useEffect } from 'react'

import amplitude from 'amplitude-js'

import { store } from '~/store'

export const useAmplitudeSetProperties = (): void => {
  const { profiles: roles, name: selectedRole } = store.getState().profile
  const { user, school } = store.getState().user
  const { levels: educational_stages } = store.getState().educationalStage

  const formatedRoles = roles?.map(role => role.name)

  const formatedEducationalStages = educational_stages?.map(
    level => `${level.label} (${level.value})`
  )

  useEffect(() => {
    amplitude.getInstance().setUserProperties({
      user,
      school,
      selectedRole,
      roles: formatedRoles,
      educational_stages: formatedEducationalStages
    })
    amplitude.getInstance().setUserId(user?.guid as string | null)
  }, [user, school, selectedRole, formatedEducationalStages, formatedRoles])
}
