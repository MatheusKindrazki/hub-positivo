import { useEffect, useMemo, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { Notification } from '~/store/modules/notifications/types'
import { notificationsRequest } from '~/store/modules/notifications/actions'

import {
  notificationConnect,
  disconnect,
  HubConnection
} from '~/services/notificationConnect'
export interface NotificationProps {
  quantityNewNotifications: number
  notifications: Notification[]
}

function useNotifications(
  toggleNotifications: number
): NotificationProps | null {
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
    if (toggleNotifications) {
      dispatch(notificationsRequest())
    }
  }, [dispatch, toggleNotifications])

  useEffect(() => {
    if (!Array.isArray(history)) return

    setMessages(history)
  }, [history])

  useEffect(() => {
    if (loading || !toggleNotifications) return

    let activeInstance: HubConnection

    notificationConnect(
      {
        idEscola: school?.value as string,
        idUsuario: info?.guid as string,
        perfil: guid,
        nivelEnsino: level
      },
      reduced_token as string,
      message => {
        setMessages(currentMessages => [...currentMessages, message])
      },
      (instance: HubConnection) => {
        activeInstance = instance
      }
    )

    return () => disconnect(activeInstance)
  }, [guid, level, reduced_token, school, loading, info, toggleNotifications])

  const quantityNewNotifications = useMemo(() => {
    return messages.filter(message => message?.new).length
  }, [messages])

  if (!toggleNotifications) return null

  return {
    notifications: messages,
    quantityNewNotifications
  }
}

export default useNotifications
