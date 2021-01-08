import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import * as Sentry from '@sentry/react'

const useSentry = (): void => {
  const { user, school } = useSelector((state: Store.State) => state.user)
  const { name } = useSelector((state: Store.State) => state.profile)
  const { level } = useSelector((state: Store.State) => state.levelEducation)

  useEffect(() => {
    // ? Captura de bugs para o Sentry
    if (process.env.REACT_APP_NODE_ENV === 'production') {
      Sentry.setUser({
        username: user?.username as string,
        id: user?.guid as string,
        email: user?.email as string
      })

      Sentry.setContext('user_info', {
        username: user?.username as string,
        email: user?.email as string,
        role: name,
        school: school?.label as string,
        educational_stage: level,
        id: user?.guid as string
      })
    }
  }, [level, name, school?.label, user])
}

export { useSentry }
