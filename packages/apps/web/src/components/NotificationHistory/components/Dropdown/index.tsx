import React from 'react'

import { Header, Container } from '..'

import { useSelector } from 'react-redux'

import { Box, Text } from '@psdhub/common/components'

import { Container as BoxUI } from './styles'
export interface DropDownProps {
  goToSettings: () => void
  markAllAsRead: () => void
}

const Dropdown: React.FC<DropDownProps> = ({ markAllAsRead, goToSettings }) => {
  const { history } = useSelector((state: Store.State) => state.notifications)
  return (
    <Box maxW="26rem" borderRadius="8px" border="solid 1px #E5E5E5">
      <Header
        title="Notificações"
        markAllAsRead={markAllAsRead}
        goToSettings={goToSettings}
      />
      <BoxUI
        w="100%"
        overflowY={['scroll', 'overlay']}
        overflowX="hidden"
        maxH="25.5rem"
      >
        {!history && (
          <Box w="22rem">
            <Text textAlign="center" lineHeight="6rem">
              Não há notificações no momento.
            </Text>
          </Box>
        )}
        {history?.map(notification => (
          <Container
            key={`${notification.origem} - ${notification.data}`}
            solutionName={notification.origem}
            message={notification.mensagem}
            date={notification.data}
            imageURL={notification.icone}
            read={false}
          />
        ))}
      </BoxUI>
    </Box>
  )
}

export default Dropdown
