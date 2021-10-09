import React, { useEffect, useRef } from 'react'

import { MenuList, Menu } from '@psdhub/common/components/Menu'
import { Bell } from '@psdhub/common/components/Icons'
import { Box } from '@psdhub/common/components'

import { Dropdown } from '~/components/NotificationHistory/components'

import { ButtonContainer } from './styles'

interface NotificationButtonProps {
  count: number
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ count }) => {
  const div = useRef<HTMLDivElement>(null)

  useEffect(() => {
    div.current?.style.setProperty('--quantity-notifications', count.toString())
  }, [count])

  return (
    <Menu placement="bottom-end">
      <ButtonContainer ref={div} hasNew={!!count}>
        <Box as={Bell} size="1.6rem" />
      </ButtonContainer>
      <MenuList
        position="relative"
        left="1"
        p="0"
        w={['16rem', '25rem', '25rem', '26rem']}
      >
        <Dropdown markAllAsRead={() => null} />
      </MenuList>
    </Menu>
  )
}

export default NotificationButton
