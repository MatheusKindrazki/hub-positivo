import { useState } from 'react'

import { useSelector } from 'react-redux'

import { notificationConnect } from '~/services/notificationConnect'

function useNotifications(): void {
  const { level } = useSelector((state: Store.State) => state.educationalStage)
  const { info, school } = useSelector((state: Store.State) => state.user)
  const { guid } = useSelector((state: Store.State) => state.profile)

  const [messages, setMessages] = useState<string[]>([])

  notificationConnect(
    {
      idEscola: school?.value as string,
      idUsuario: info?.guid as string,
      perfil: guid as string,
      nivelEnsino: level
    },
    (message: string) => {
      setMessages(messages => [...messages, message])
    }
  )

  console.log(messages)
}

export default useNotifications
