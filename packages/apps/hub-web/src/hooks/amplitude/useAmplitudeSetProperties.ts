import { useEffect } from 'react'

import amplitude from 'amplitude-js'

import { useSelector } from 'react-redux'

export const useAmplitudeSetProperties = (): void => {
  const { name: role } = useSelector((state: Store.State) => state.profile)
  const { user, school: schoolObject } = useSelector(
    (state: Store.State) => state.user
  )
  const { level: educational_stage } = useSelector(
    (state: Store.State) => state.educationalStage
  )

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
