import { useEffect } from 'react'

import * as Sentry from '@sentry/react'

import { useSelector } from 'react-redux'

const useSentry = (): void => {
  /* istanbul ignore next */
  const { user, school } = useSelector((state: Store.State) => state.user)
  /* istanbul ignore next */
  const { name } = useSelector((state: Store.State) => state.profile)
  /* istanbul ignore next */
  const { level } = useSelector((state: Store.State) => state.educationalStage)

  useEffect(() => {
    // ? Captura de bugs para o Sentry
    console.log(process.env.REACT_APP_NODE_ENV)

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
