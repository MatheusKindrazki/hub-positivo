import React, { useState, useCallback, useImperativeHandle } from 'react'

import { debounce } from 'ts-debounce'

import { useSelector, useDispatch } from 'react-redux'

import { signOut } from '~/store/modules/auth/actions'

import Drawer, {
  useDisclosure,
  DrawerOverlay
} from '@psdhub/common/components/Drawer'
import { Search, Box } from '@psdhub/common/components'

import history from '~/services/history'

import { HeaderProvider, useHeader } from '~/components/Header/context'
import { RefMenuProps } from '~/components/Header/components/Mobile'

import { useFilterCards } from '~/hooks/useFilterCards'

import { DrawerContentContainer } from './styles'

import { MenuHeader, SelectProfile, MenuFooter, Submenu } from '..'

import { FooterProps } from '../Footer'

export interface MenuProps {
  openModalPass: FooterProps['openModalPass']
  isOpenMenu?: boolean
  onCloseMenu?: () => void
}

const MenuBar = React.forwardRef<RefMenuProps, MenuProps>(
  ({ openModalPass, isOpenMenu = true, onCloseMenu = () => null }, ref) => {
    const dispatch = useDispatch()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { info: user } = useSelector((state: Store.State) => state.user)
    const { data: cards } = useSelector((state: Store.State) => state.products)
    const [search, setSearchValue] = useState('')
    const { resetInfo } = useHeader()

    const openMenu = (): void => {
      if (!isOpen) {
        resetInfo()

        onOpen()
      } else {
        onClose()
      }
    }

    useImperativeHandle(ref, () => {
      return {
        openMenu
      }
    })

    const filterCards = useFilterCards(cards, search)

    const handleSignOut = useCallback(async () => {
      dispatch(signOut())
      setTimeout(() => history.push('/login'), 500)
    }, [dispatch])

    const handleSearch = debounce(value => {
      setSearchValue(value)
    }, 550)
    return (
      <HeaderProvider>
        <Drawer
          isOpen={isOpenMenu}
          onClose={onCloseMenu}
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
                onClose={onCloseMenu}
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
            <Box
              borderBottomWidth="1px"
              borderBottomColor="#C9C9C9"
              width="100%"
            >
              {filterCards.map((e, cardIndex) => (
                <Submenu key={cardIndex} card={e} />
              ))}
            </Box>
            <MenuFooter
              handleSignOut={handleSignOut}
              openModalPass={openModalPass}
            />
          </DrawerContentContainer>
        </Drawer>
      </HeaderProvider>
    )
  }
)

export default MenuBar
