import React, { useMemo } from 'react'

import { Notification } from '~/store/modules/notifications/types'

import { Menu, MenuList, MenuButton } from '@psdhub/common/components/Menu'
import { DotsThreeVertical } from '@psdhub/common/components/Icons'
import { Box, Text } from '@psdhub/common/components'

import { formatDate } from './utils/formatDate'
import { Flex } from './styles'

export interface NotificationContainerProps extends Notification {
  isNew: boolean
  allowThisTypeOf?: boolean
}

const NotificationContainer: React.FC<NotificationContainerProps> = props => {
  const { sentDate, isNew, title, message } = props

  const formattedDate = useMemo(() => {
    return formatDate(sentDate || new Date())
  }, [sentDate])

  const opacity = useMemo(() => {
    return isNew ? 0.7 : 1
  }, [isNew])

  return (
    <Flex
      w="100%"
      isNew={isNew}
      bg="white"
      borderTop="solid 1px #E5E5E5"
      className="container"
      px="3.5"
    >
      <Box width="95%" d="flex">
        <Box overflow="hidden" py="2">
          <Text
            fontSize={'1rem'}
            fontWeight="700"
            color="#3C3C3C"
            textTransform="capitalize"
            opacity={opacity}
          >
            {title}
          </Text>
          <Text
            lineHeight="20px"
            noOfLines={5}
            fontSize="1rem"
            opacity={opacity}
          >
            {message}
          </Text>
          <Text color="#6F6F6F" fontSize="0.75rem" opacity={opacity}>
            {formattedDate}
          </Text>
        </Box>
      </Box>
      <Box width="5%" py="2">
        <Menu placement="left" flip>
          <MenuButton data-testid="menu-button">
            <DotsThreeVertical
              size="25"
              color="#969696"
              weight="bold"
              cursor="pointer"
            />
          </MenuButton>
          <MenuList position="relative" top="1.5" left="2">
            <Text
              px="10px"
              textAlign="start"
              cursor="pointer"
              _hover={{ background: 'gray.400' }}
              py="5px"
            >
              {isNew ? 'Marcar como lida' : 'Marcar como não lida'}
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
