import { useEffect } from 'react'

import amplitude from 'amplitude-js'

import { store } from '~/store'

export const useAmplitudeSetProperties = (): void => {
  const { name: role } = store.getState().profile
  const { user, school: schoolObject } = store.getState().user
  const { level: educational_stage } = store.getState().educationalStage

  useEffect(() => {
    amplitude.getInstance().setUserId(user?.guid as string | null)
    amplitude.getInstance().setUserProperties({
      user,
      school: schoolObject?.value,
      role,
      educational_stage
    })
  }, [user, schoolObject, educational_stage, role])
}
