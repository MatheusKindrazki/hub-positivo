import React from 'react'

import { Header, Container } from '..'

import { useSelector } from 'react-redux'

import { Box, Text } from '@psdhub/common/components'

import { Container as BoxUI } from './styles'
export interface DropDownProps {
  markAllAsRead: () => void
}

const Dropdown: React.FC<DropDownProps> = ({ markAllAsRead }) => {
  const { history } = useSelector((state: Store.State) => state.notifications)
  console.log('history:', history)
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
        {!history && (
          <Box w="100%">
            <Text textAlign="center" lineHeight="6rem">
              Não há notificações no momento.
            </Text>
          </Box>
        )}
        {history?.map(notification => (
          <Container
            key={`${notification.origem} - ${notification.id}`}
            titulo={notification.origem}
            mensagem={notification.mensagem}
            dataEnvio={notification.dataEnvio}
            icone={notification.icone}
            read={false}
            id={notification.id}
            dataExpiracao={notification.dataExpiracao}
            url={notification.url}
            origem={notification.origem}
          />
        ))}
      </BoxUI>
    </Box>
  )
}

export default Dropdown
