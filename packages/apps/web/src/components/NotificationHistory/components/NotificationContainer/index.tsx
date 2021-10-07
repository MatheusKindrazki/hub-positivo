import React, { useMemo } from 'react'

import { Notification } from '~/store/modules/notifications/types'

import { Menu, MenuList, MenuButton } from '@psdhub/common/components/Menu'
import { DotsThreeVertical } from '@psdhub/common/components/Icons'
import { Box, Text } from '@psdhub/common/components'

import { formatDate } from './utils/formatDate'
import { Flex } from './styles'

export interface NotificationContainerProps extends Notification {
  read: boolean
  allowThisTypeOf?: boolean
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  read,
  dataEnvio,
  mensagem,
  titulo
}) => {
  const formattedDate = useMemo(() => {
    console.log({ dataEnvio })
    return formatDate(dataEnvio)
  }, [dataEnvio])

  const opacity = useMemo(() => {
    return read ? 0.7 : 1
  }, [read])

  return (
    <Flex
      w="100%"
      p="2"
      read={read}
      bg="white"
      borderTop="solid 1px #E5E5E5"
      className="container"
    >
      <Box width="95%" d="flex">
        <Box px="1rem" overflow="hidden">
          <Text
            fontSize="1rem"
            fontWeight="700"
            color="#3C3C3C"
            textTransform="capitalize"
            opacity={opacity}
          >
            {titulo}
          </Text>
          <Text
            lineHeight="20px"
            noOfLines={5}
            fontSize="1rem"
            opacity={opacity}
          >
            {mensagem}
          </Text>
          <Text color="#6F6F6F" fontSize="0.75rem" opacity={opacity}>
            {formattedDate}
          </Text>
        </Box>
      </Box>
      <Box width="5%">
        <Menu placement="left" flip>
          <MenuButton data-testid="menu-button">
            <DotsThreeVertical
              size="25"
              color="#969696"
              weight="bold"
              cursor="pointer"
            />
          </MenuButton>
          <MenuList position="relative" top="1.5">
            <Text
              px="10px"
              textAlign="start"
              cursor="pointer"
              _hover={{ background: 'gray.400' }}
              py="5px"
            >
              {read ? 'Marcar como não lida' : 'Marcar como lida'}
            </Text>
            <Text
              px="10px"
              textAlign="start"
              cursor="pointer"
              _hover={{ background: 'gray.400' }}
              py="5px"
            >
              Excluir
            </Text>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}

export default NotificationContainer
