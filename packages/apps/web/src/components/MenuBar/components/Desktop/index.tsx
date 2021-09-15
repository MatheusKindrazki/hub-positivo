import React from 'react'

import { useSelector } from 'react-redux'

import Drawer, {
  DrawerContent,
  useDisclosure,
  DrawerOverlay
} from '@psdhub/common/components/Drawer'
import { Search, Box } from '@psdhub/common/components'

import { HeaderProvider } from '~/components/Header/context'

import { CollapseContainer } from './styles'

import { MenuHeader, SelectProfile, MenuFooter } from '..'

const MenuBar: React.FC = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const { info: user } = useSelector((state: Store.State) => state.user)

  return (
    <HeaderProvider>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={'left'}
        isFullHeight
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Box borderBottomWidth="1px" borderBottomColor="#C9C9C9">
            <MenuHeader
              name={user?.name || 'usuário (a)'}
              closeButton
              onClose={onClose}
            />
          </Box>
          <Box
            px="1rem"
            py="1rem"
            overflow="visible"
            borderBottomWidth="1px"
            borderBottomColor="#C9C9C9"
            d="flex"
            alignItems="center"
          >
            <Box w="100%">
              <SelectProfile />
            </Box>
          </Box>
          <Box
            py="1rem"
            alignItems="center"
            d="flex"
            borderBottomWidth="1px"
            borderBottomColor="#C9C9C9"
            px="1rem"
          >
            <Box w="100%">
              <Search placeholder="Buscar solução" />
            </Box>
          </Box>
          <Box p="1rem">
            <CollapseContainer
              title="Favoritos"
              id="10"
              cor="blue.500"
              nome="Favoritos"
              className="teste"
            >
              teste
            </CollapseContainer>
          </Box>
          <MenuFooter />
        </DrawerContent>
      </Drawer>
    </HeaderProvider>
  )
}

export default MenuBar
