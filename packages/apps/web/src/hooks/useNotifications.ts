import { useEffect, useMemo, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { Notification } from '~/store/modules/notifications/types'
import { notificationsRequest } from '~/store/modules/notifications/actions'

import { notificationConnect } from '~/services/notificationConnect'
export interface NotificationProps {
  quantityNewNotifications: number
  notifications: Notification[]
}

function useNotifications(): NotificationProps {
  const dispatch = useDispatch()

  const { level } = useSelector((state: Store.State) => state.educationalStage)
  const { info, school } = useSelector((state: Store.State) => state.user)
  const { guid } = useSelector((state: Store.State) => state.profile)

  const { reduced_token } = useSelector((state: Store.State) => state.auth)

  const { history, loading } = useSelector(
    (state: Store.State) => state.notifications
  )

  const [messages, setMessages] = useState([] as Notification[])

  useEffect(() => {
    dispatch(notificationsRequest())
  }, [dispatch])

  useEffect(() => {
    if (!Array.isArray(history)) return

    setMessages(history)
  }, [history])

  useEffect(() => {
    if (loading) return

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
  }, [guid, level, reduced_token, school, loading, info])

  const quantityNewNotifications = useMemo(() => {
    return messages.filter(message => message?.new).length
  }, [messages])

  return {
    notifications: messages,
    quantityNewNotifications
  }
}

export default useNotifications
