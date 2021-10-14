import React, { useEffect, useRef, useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { notificationPutRequest } from '~/store/modules/notifications/actions'

import { MenuList, Menu } from '@psdhub/common/components/Menu'
import { Bell } from '@psdhub/common/components/Icons'
import { Box } from '@psdhub/common/components'

import { Dropdown } from '~/components/NotificationHistory/components'

import { NotificationProps } from '~/hooks/useNotifications'

import { ButtonContainer } from './styles'

const NotificationButton: React.FC<NotificationProps> = props => {
  const { notifications, quantityNewNotifications } = props

  const dispatch = useDispatch()

  const div = useRef<HTMLDivElement>(null)

  useEffect(() => {
    div.current?.style.setProperty(
      '--quantity-notifications',
      quantityNewNotifications.toString()
    )
  }, [quantityNewNotifications])

  const markAllAsRead = useCallback(() => {
    const notificationIds = notifications.map(notification => notification.id)
    dispatch(notificationPutRequest({ notificationIds, markAsRead: true }))
  }, [dispatch, notifications])

  return (
    <Menu placement="bottom-end">
      <ButtonContainer ref={div} hasNew={!!quantityNewNotifications}>
        <Box as={Bell} size="1.6rem" />
      </ButtonContainer>
      <MenuList
        position="relative"
        left="1"
        p="0"
        w={['16rem', '25rem', '25rem', '26rem']}
      >
        <Dropdown messages={notifications} markAllAsRead={markAllAsRead} />
      </MenuList>
    </Menu>
  )
}

export default NotificationButton
