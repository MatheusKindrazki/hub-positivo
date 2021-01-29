import { useEffect } from 'react'

import { useSelector } from 'react-redux'

const useSendGlobalInfo = (): void => {
  const { user, school } = useSelector((state: Store.State) => state.user)
  const { name } = useSelector((state: Store.State) => state.profile)
  const { level } = useSelector((state: Store.State) => state.educationalStage)

  useEffect(() => {
    window.__HUB_USER_INFO__ = {
      id: user?.guid as string,
      educational_stage: level || '',
      name: user?.name as string,
      role: name,
      school: school?.label as string
    }
  }, [level, name, school?.label, user])
}
export { useSendGlobalInfo }
