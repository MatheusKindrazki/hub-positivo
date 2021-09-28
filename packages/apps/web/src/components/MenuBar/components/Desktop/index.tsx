import React, {
  useState,
  useCallback,
  useImperativeHandle,
  useRef
} from 'react'

import { debounce } from 'ts-debounce'

import { useSelector, useDispatch } from 'react-redux'

import { preAuth } from '~/store/modules/authProduct/actions'

import { createSlug } from '@psdhub/common/utils'
import { useMediaQuery } from '@psdhub/common/hooks'
import Drawer, {
  useDisclosure,
  DrawerOverlay
} from '@psdhub/common/components/Drawer'
import { Search, Box } from '@psdhub/common/components'

import { useFilterCards } from '~/hooks/useFilterCards'

import { DrawerContentContainer } from './styles'
import { FooterProps } from '../Footer'
import { useHeader } from '../../context'

import ModalSignOut, {
  ModalHandler
} from '~/components/ModalSignOut/ModalSignOut'

import {
  MenuHeader,
  SelectProfile,
  MenuFooter,
  Submenu,
  Skeleton as CategorySkeleton
} from '..'

export interface HandleProps {
  url: string
  tipoRenderizacao: string
  nome: string
}
export interface RefMenuProps {
  openMenu: () => void
}

export interface MenuProps {
  openModalPass: FooterProps['openModalPass']
  openModalVersionUpdate: ModalHandler['onOpen']
}

const MenuBar = React.forwardRef<RefMenuProps, MenuProps>(
  ({ openModalPass, openModalVersionUpdate }, ref) => {
    const dispatch = useDispatch()
    const { onOpen, onClose, isOpen } = useDisclosure({ defaultIsOpen: false })
    const {
      onOpen: onSubmenuOpen,
      onClose: onSubmenuClose,
      isOpen: isSubmenuOpen
    } = useDisclosure()
    const { info: user } = useSelector((state: Store.State) => state.user)
    const { data: cards, loading } = useSelector(
      (state: Store.State) => state.products
    )

    const modalSignOutRef = useRef<ModalHandler>(null)

    const [isDesktop] = useMediaQuery('(min-width: 768px)')
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

    const handleSearch = debounce(value => {
      setSearchValue(value)
    }, 550)

    const handleCardClick = useCallback(
      (solution: HandleProps) => {
        const slug = createSlug(solution.nome)

        dispatch(
          preAuth({
            product: slug,
            name: solution.nome,
            url: solution.url,
            tipoRenderizacao: solution.tipoRenderizacao
          })
        )
      },
      [dispatch]
    )

    return (
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={'left'}
        isFullHeight={true}
      >
        <DrawerOverlay />
        <DrawerContentContainer
          overflowY={
            isSubmenuOpen ? ['overlay', 'overlay', 'unset'] : 'overlay'
          }
          overflowX={isSubmenuOpen ? 'unset' : 'hidden'}
        >
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
            {!loading ? (
              filterCards.map((card, cardIndex) => (
                <Submenu
                  isDesktop={isDesktop}
                  onOpen={onSubmenuOpen}
                  onClose={onSubmenuClose}
                  isOpen={isSubmenuOpen}
                  key={cardIndex}
                  card={card}
                  handleClick={handleCardClick}
                />
              ))
            ) : (
              <CategorySkeleton />
            )}
          </Box>
          <MenuFooter
            handleSignOut={() => modalSignOutRef.current?.onOpen()}
            openModalPass={openModalPass}
            openModalVersionUpdate={openModalVersionUpdate}
          />
          <ModalSignOut ref={modalSignOutRef} />
        </DrawerContentContainer>
      </Drawer>
    )
  }
)

export default MenuBar
