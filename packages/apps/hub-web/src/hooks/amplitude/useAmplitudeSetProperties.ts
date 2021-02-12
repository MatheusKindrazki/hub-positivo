import { useEffect } from 'react'

import amplitude from 'amplitude-js'

import { store } from '~/store'

export const useAmplitudeSetProperties = (): void => {
  const { name: role } = store.getState().profile
  const { user, school: schoolObject } = store.getState().user
  const { level: educational_stage } = store.getState().educationalStage

  useEffect(() => {
    amplitude.getInstance().setUserProperties({
      user,
      school: schoolObject?.value,
      role,
      educational_stage
    })
    amplitude.getInstance().setUserId(schoolObject?.user_id as string | null)
  }, [user, schoolObject, educational_stage, role])
}
