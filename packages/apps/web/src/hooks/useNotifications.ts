import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { notificationConnect } from '~/services/notificationConnect'

function useNotifications(): void {
  const { level } = useSelector((state: Store.State) => state.educationalStage)
  const { info, school } = useSelector((state: Store.State) => state.user)
  const { guid } = useSelector((state: Store.State) => state.profile)

  const { reduced_token } = useSelector((state: Store.State) => state.auth)

  const [, setMessages] = useState<string[]>([])

  useEffect(() => {
    notificationConnect(
      {
        idEscola: school?.value as string,
        idUsuario: info?.guid as string,
        perfil: guid as string,
        nivelEnsino: level
      },
      reduced_token as string,
      (message: string) => {
        setMessages(messages => [...messages, message])

        console.log(message)
      }
    )
  }, [guid, info, level, reduced_token, school])
}

export default useNotifications
