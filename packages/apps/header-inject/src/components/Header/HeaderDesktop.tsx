import React from 'react'

import { Menu, Button, Box, Heading } from '@hub/common/components'

import Card from '../Card'
import GlobalStyle from './styles'

const HeaderDesktop: React.FC = () => {
  const { MenuContainer, MenuButton, MenuList } = Menu

  return (
    <div className="hub-header-list">
      <MenuContainer>
        <MenuButton
          as={Button}
          fontSize="0.875rem"
          backgroundColor="white"
          fontWeight="bold"
          color="blue.500"
          mx="1"
          type="button"
        >
          Produtos
        </MenuButton>
        <MenuList
          style={{ zIndex: 9999 }}
          minW="300px"
          h="100%"
          borderRadius="0"
          background="transparent!important"
          border="none"
          boxShadow="none"
          className="hub-header-list"
          w="19rem"
        >
          <Box
            style={{ zIndex: 999999 }}
            borderRadius="4px"
            boxShadow="sm"
            top="8px!important"
            px="6"
            py="4"
            w="100%"
            maxW="330px"
            h="auto"
            background="white!important"
          >
            <Box mb="4">
              <Heading as="h4" fontSize="sm">
                Avaliações
              </Heading>
            </Box>

            <Box
              d="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Card />
            </Box>
          </Box>
        </MenuList>
      </MenuContainer>
      <GlobalStyle />
    </div>
  )
}

export default HeaderDesktop
