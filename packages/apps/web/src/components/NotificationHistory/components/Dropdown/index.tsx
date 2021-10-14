import React from 'react'

import { Header, Container } from '..'

import { Notification } from '~/store/modules/notifications/types'

import { Box, Text } from '@psdhub/common/components'

import { Container as BoxUI } from './styles'
export interface DropDownProps {
  markAllAsRead: () => void
  messages: Notification[]
}

const Dropdown: React.FC<DropDownProps> = ({ markAllAsRead, messages }) => {
  return (
    <Box maxW="26rem" borderRadius="8px" w="100%">
      <Header title="Notificações" markAllAsRead={markAllAsRead} />
      <BoxUI
        w="100%"
        overflowY={['scroll', 'overlay']}
        overflowX="hidden"
        maxH="25.5rem"
        minH="6rem"
      >
        {!messages && (
          <Box w="100%" px="3.5">
            <Text
              textAlign="center"
              minH="6rem"
              d="flex"
              alignItems="center"
              justifyContent="center"
            >
              Não há notificações no momento.
            </Text>
          </Box>
        )}
        {messages?.map(notification => (
          <Container
            key={notification.id}
            isNew={notification.new || false}
            {...notification}
          />
        ))}
      </BoxUI>
    </Box>
  )
}

export default Dropdown
