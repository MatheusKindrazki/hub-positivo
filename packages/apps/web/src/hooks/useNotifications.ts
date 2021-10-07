import { useEffect, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

import {
  notificationConnect,
  NotificationData
} from '~/services/notificationConnect'
export interface NotificationProps {
  quantityNewNotifications: number
  notifications: NotificationData[]
}

function useNotifications(): NotificationProps {
  const { level } = useSelector((state: Store.State) => state.educationalStage)
  const { info, school } = useSelector((state: Store.State) => state.user)
  const { guid } = useSelector((state: Store.State) => state.profile)

  const { reduced_token } = useSelector((state: Store.State) => state.auth)

  const [messages, setMessages] = useState<NotificationData[]>([])

  useEffect(() => {
    notificationConnect(
      {
        idEscola: school?.value as string,
        idUsuario: info?.guid as string,
        perfil: guid as string,
        nivelEnsino: level
      },
      reduced_token as string,
      message => {
        setMessages(messages => [...messages, message])
      }
    )
  }, [guid, info, level, reduced_token, school])

  const quantityNewNotifications = useMemo(() => {
    return messages.filter(message => message?.new).length
  }, [messages])

  return {
    notifications: messages,
    quantityNewNotifications
  }
}

export default useNotifications
