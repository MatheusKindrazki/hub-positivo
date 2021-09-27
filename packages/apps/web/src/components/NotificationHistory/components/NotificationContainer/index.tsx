import React, { useMemo } from 'react'

import { Menu, MenuList, MenuButton } from '@psdhub/common/components/Menu'
import { DotsThreeVertical } from '@psdhub/common/components/Icons'
import { Image, Box, Text } from '@psdhub/common/components'

import { formatDate } from './utils/formatDate'
import { Flex } from './styles'
export interface NotificationContainerProps {
  solutionName: string
  date: Date
  imageURL: string
  message: string
  read: boolean
  allowThisTypeOf?: boolean
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  date,
  solutionName,
  imageURL,
  message,
  read,
  allowThisTypeOf = true
}) => {
  const formattedDate = useMemo(() => {
    return formatDate(date)
  }, [date])

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
        <Image
          bg="blue.500"
          src={imageURL}
          alt=""
          minW="3rem"
          w="3rem"
          h="3rem"
          p="2"
          mt="1"
          borderRadius="0.5rem"
        />
        <Box px="0.5rem" overflow="hidden">
          <Text
            fontSize="1rem"
            fontWeight="700"
            color="#3C3C3C"
            textTransform="capitalize"
            opacity={opacity}
          >
            {solutionName}
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
      <Box width="5%">
        <Menu placement="bottom-start">
          <MenuButton data-testid="menu-button">
            <DotsThreeVertical
              size="25"
              color="#969696"
              weight="bold"
              cursor="pointer"
            />
          </MenuButton>
          <MenuList right={['0.25rem', 'auto']} position="relative">
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
              {allowThisTypeOf
                ? 'Desativar notificações como essa'
                : 'Ativar notificações como essa'}
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
