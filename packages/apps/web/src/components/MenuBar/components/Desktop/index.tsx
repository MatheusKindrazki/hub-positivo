import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import Drawer, {
  useDisclosure,
  DrawerOverlay
} from '@psdhub/common/components/Drawer'
import { Search, Box } from '@psdhub/common/components'

import { DrawerContentContainer } from './styles'

import { debounce } from 'ts-debounce'

import { useFilterCards } from '~/hooks/useFilterCards'

import { HeaderProvider } from '~/components/Header/context'

import { MenuHeader, SelectProfile, MenuFooter, Submenu } from '..'

const MenuBar: React.FC = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const { info: user } = useSelector((state: Store.State) => state.user)
  const { data: cards } = useSelector((state: Store.State) => state.products)
  const [search, setSearchValue] = useState('')

  const filterCards = useFilterCards(cards, search)

  console.log({ filterCards })

  const handleSearch = debounce(value => {
    setSearchValue(value)
  }, 550)
  return (
    <HeaderProvider>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={'left'}
        blockScrollOnMount={false}
        isFullHeight={true}
      >
        <DrawerOverlay />
        <DrawerContentContainer overflowY="auto" overflowX="hidden">
          <Box p="1rem" borderBottomWidth="1px" borderBottomColor="#C9C9C9">
            <MenuHeader
              name={user?.name || 'Menu'}
              closeButton
              onClose={onClose}
            />
          </Box>
          <Box
            px="1rem"
            py="1rem"
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
            px="1rem"
            alignItems="center"
            d="flex"
            borderBottomWidth="1px"
            borderBottomColor="#C9C9C9"
          >
            <Box w="100%">
              <Search placeholder="Buscar solução" onChange={handleSearch} />
            </Box>
          </Box>
          <Box borderBottomWidth="1px" borderBottomColor="#C9C9C9" width="100%">
            {filterCards.map((e, cardIndex) => (
              <Submenu key={cardIndex} card={e} />
            ))}
          </Box>
          <MenuFooter />
        </DrawerContentContainer>
      </Drawer>
    </HeaderProvider>
  )
}

export default MenuBar
